const store = require('../services/inMemoryStore');

const getAssignments = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    let result = [...store.assignments];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.subjectCode.toLowerCase().includes(q)
      );
    }

    if (status && status !== 'All') {
      result = result.filter((a) => a.status === status);
    }

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

const getAssignmentById = async (req, res, next) => {
  try {
    const asg = store.assignments.find((a) => a.id === req.params.id);
    if (!asg) {
      res.status(404);
      throw new Error(`Assignment not found with ID ${req.params.id}`);
    }
    res.status(200).json({ success: true, data: asg });
  } catch (error) {
    next(error);
  }
};

const createAssignment = async (req, res, next) => {
  try {
    const { title, subjectCode, subjectName, faculty, description, instructions, assignedDate, dueDate, maxMarks } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Please provide assignment title and description');
    }

    const newAssignment = {
      id: `asg-${Date.now()}`,
      title,
      subjectCode: subjectCode || 'CS301',
      subjectName: subjectName || 'Advanced Web Development',
      faculty: faculty || 'Prof. Sarah Jenkins',
      description,
      instructions: instructions || 'Follow standard coding standards.',
      assignedDate: assignedDate || new Date().toISOString().split('T')[0],
      dueDate: dueDate || '2026-10-30',
      maxMarks: parseInt(maxMarks) || 100,
      status: 'Pending',
      resubmissionAllowed: true
    };

    store.assignments.unshift(newAssignment);
    res.status(201).json({ success: true, data: newAssignment });
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const index = store.assignments.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Assignment not found with ID ${req.params.id}`);
    }

    store.assignments[index] = { ...store.assignments[index], ...req.body };
    res.status(200).json({ success: true, data: store.assignments[index] });
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const index = store.assignments.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Assignment not found with ID ${req.params.id}`);
    }

    const removed = store.assignments.splice(index, 1);
    res.status(200).json({ success: true, message: 'Assignment deleted', data: removed[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment
};
