const mongoose = require('mongoose');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const store = require('../services/inMemoryStore');
const fileStorageService = require('../services/fileStorageService');

/**
 * @desc    Upload & create/update assignment submission (Secure Student Upload)
 * @route   POST /api/submissions
 * @access  Private (Student, Faculty, Admin)
 */
const createSubmission = async (req, res, next) => {
  try {
    const { assignmentId, remarks } = req.body;

    if (!req.user) {
      res.status(401);
      throw new Error('Authentication required to submit coursework.');
    }

    if (!req.file) {
      res.status(400);
      throw new Error('Missing file: Please select an assignment file to upload.');
    }

    if (!assignmentId) {
      res.status(400);
      throw new Error('Missing assignmentId: Submission must be linked to an assignment.');
    }

    const currentStudentId = req.user.id || req.user._id || 'STU-2026-042';
    const currentStudentName = req.user.name || 'Alex Morgan';

    // 1. Stream file to cloud storage
    const uploadResult = await fileStorageService.uploadFile(req.file);
    const now = new Date();
    const nowFormatted = now.toISOString().replace('T', ' ').substring(0, 16);

    let isLate = false;

    if (mongoose.connection.readyState === 1) {
      const assignmentDoc = await Assignment.findById(assignmentId);
      if (!assignmentDoc) {
        res.status(404);
        throw new Error('Assignment not found. Cannot attach submission.');
      }

      if (assignmentDoc.dueDate) {
        isLate = now > new Date(assignmentDoc.dueDate);
      }
      const submissionStatus = isLate ? 'Late' : 'Submitted';

      const payload = {
        assignment: mongoose.Types.ObjectId.isValid(assignmentId) ? assignmentId : new mongoose.Types.ObjectId(),
        student: mongoose.Types.ObjectId.isValid(currentStudentId) ? currentStudentId : new mongoose.Types.ObjectId(),
        studentIdStr: req.user.studentId || currentStudentId,
        studentName: currentStudentName,
        assignmentTitle: assignmentDoc.title,
        fileName: uploadResult.fileName,
        fileUrl: uploadResult.fileUrl,
        fileType: uploadResult.mimeType || 'application/pdf',
        fileSize: uploadResult.fileSize,
        publicId: uploadResult.publicId,
        submittedAt: nowFormatted,
        status: submissionStatus,
        grade: 'Pending',
        feedback: remarks || ''
      };

      // Resubmission upsert logic to prevent duplicate records
      const submissionRecord = await Submission.findOneAndUpdate(
        { assignment: payload.assignment, student: payload.student },
        payload,
        { upsert: true, new: true, runValidators: true }
      );

      return res.status(201).json({
        success: true,
        message: `Assignment submitted successfully (${submissionStatus})`,
        data: submissionRecord
      });
    }

    // Fallback store handling
    const assignment = store.assignments.find((a) => a.id === assignmentId);
    if (!assignment) {
      res.status(404);
      throw new Error('Assignment not found. Cannot attach submission.');
    }

    isLate = now > new Date(assignment.dueDate);
    const submissionStatus = isLate ? 'Late' : 'Submitted';

    const newSubmission = {
      id: `subm-${Date.now()}`,
      assignmentId,
      assignmentTitle: assignment.title,
      studentId: currentStudentId,
      studentName: currentStudentName,
      department: req.user.department || 'Computer Science & Engineering',
      submittedDate: nowFormatted,
      fileName: uploadResult.fileName,
      fileSize: uploadResult.fileSize,
      fileUrl: uploadResult.fileUrl,
      publicId: uploadResult.publicId,
      status: submissionStatus,
      grade: 'Pending',
      feedback: remarks || ''
    };

    const existingIndex = store.submissions.findIndex(
      (s) => s.assignmentId === assignmentId && (s.studentId === currentStudentId || s.studentId === req.user.studentId)
    );

    if (existingIndex >= 0) {
      store.submissions[existingIndex] = newSubmission;
    } else {
      store.submissions.unshift(newSubmission);
    }

    res.status(201).json({
      success: true,
      message: `Assignment submitted successfully (${submissionStatus})`,
      data: newSubmission
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all submissions
 * @route   GET /api/submissions
 * @access  Private (Faculty, Admin)
 */
const getSubmissions = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { studentName: { $regex: search, $options: 'i' } },
          { fileName: { $regex: search, $options: 'i' } },
          { assignmentTitle: { $regex: search, $options: 'i' } }
        ];
      }
      const submissions = await Submission.find(query)
        .populate('student', 'name studentId email department')
        .populate('assignment', 'title subjectCode dueDate')
        .sort({ createdAt: -1 });

      return res.status(200).json({ success: true, count: submissions.length, data: submissions });
    }

    let result = [...store.submissions];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.studentName.toLowerCase().includes(q) || s.fileName.toLowerCase().includes(q)
      );
    }
    if (status && status !== 'All') {
      result = result.filter((s) => s.status === status);
    }

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get submission by ID (Self or Faculty/Admin)
 * @route   GET /api/submissions/:id
 * @access  Private
 */
const getSubmissionById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const sub = await Submission.findById(req.params.id)
        .populate('student', 'name studentId email')
        .populate('assignment', 'title dueDate');
      if (!sub) {
        res.status(404);
        throw new Error(`Submission not found with ID ${req.params.id}`);
      }

      // Security check: Student can only view their own submission
      if (
        req.user &&
        req.user.role === 'student' &&
        sub.student._id.toString() !== req.user.id &&
        sub.student.studentId !== req.user.studentId
      ) {
        res.status(403);
        throw new Error("Access Denied: You are not authorized to view another student's submission.");
      }

      return res.status(200).json({ success: true, data: sub });
    }

    const sub = store.submissions.find((s) => s.id === req.params.id);
    if (!sub) {
      res.status(404);
      throw new Error(`Submission not found with ID ${req.params.id}`);
    }

    if (
      req.user &&
      req.user.role === 'student' &&
      sub.studentId !== req.user.id &&
      sub.studentId !== req.user.studentId
    ) {
      res.status(403);
      throw new Error("Access Denied: You are not authorized to view another student's submission.");
    }

    res.status(200).json({ success: true, data: sub });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get submissions for assignment
 * @route   GET /api/submissions/assignment/:assignmentId
 * @access  Private (Faculty, Admin)
 */
const getSubmissionsByAssignment = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const list = await Submission.find({ assignment: req.params.assignmentId }).populate('student', 'name studentId');
      return res.status(200).json({ success: true, count: list.length, data: list });
    }

    const list = store.submissions.filter((s) => s.assignmentId === req.params.assignmentId);
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get submissions by student ID (Self or Faculty/Admin)
 * @route   GET /api/submissions/student/:studentId
 * @access  Private
 */
const getSubmissionsByStudent = async (req, res, next) => {
  try {
    const targetId = req.params.studentId;

    // Security check: Student can only access their own submission history
    if (
      req.user &&
      req.user.role === 'student' &&
      req.user.id !== targetId &&
      req.user.studentId !== targetId &&
      targetId !== 'me'
    ) {
      res.status(403);
      throw new Error("Access Denied: You are not authorized to view another student's submission history.");
    }

    const queryStudentId = targetId === 'me' ? (req.user?.id || 'STU-2026-042') : targetId;

    if (mongoose.connection.readyState === 1) {
      const list = await Submission.find({
        $or: [{ student: queryStudentId }, { studentIdStr: queryStudentId }]
      }).populate('assignment', 'title subjectCode');

      return res.status(200).json({ success: true, count: list.length, data: list });
    }

    const list = store.submissions.filter((s) => s.studentId === queryStudentId || s.studentId === req.user?.studentId);
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update submission grade / feedback
 * @route   PUT /api/submissions/:id
 * @access  Private (Faculty, Admin)
 */
const updateSubmission = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        res.status(404);
        throw new Error(`Submission not found with ID ${req.params.id}`);
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const index = store.submissions.findIndex((s) => s.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Submission not found with ID ${req.params.id}`);
    }
    store.submissions[index] = { ...store.submissions[index], ...req.body };
    res.status(200).json({ success: true, data: store.submissions[index] });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete submission
 * @route   DELETE /api/submissions/:id
 * @access  Private (Admin)
 */
const deleteSubmission = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const removed = await Submission.findByIdAndDelete(req.params.id);
      if (!removed) {
        res.status(404);
        throw new Error(`Submission not found with ID ${req.params.id}`);
      }
      if (removed.publicId) {
        await fileStorageService.deleteFile(removed.publicId);
      }
      return res.status(200).json({ success: true, message: 'Submission deleted', data: removed });
    }

    const index = store.submissions.findIndex((s) => s.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Submission not found with ID ${req.params.id}`);
    }
    const removed = store.submissions.splice(index, 1);
    res.status(200).json({ success: true, message: 'Submission deleted', data: removed[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
  getSubmissionById,
  getSubmissionsByAssignment,
  getSubmissionsByStudent,
  updateSubmission,
  deleteSubmission
};
