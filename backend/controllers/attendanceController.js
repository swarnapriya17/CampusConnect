const store = require('../services/inMemoryStore');

const getAttendance = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, count: store.attendance.length, data: store.attendance });
  } catch (error) {
    next(error);
  }
};

const getAttendanceByStudent = async (req, res, next) => {
  try {
    const list = store.attendance.filter((a) => a.studentId === req.params.studentId);
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

const getAttendanceBySubject = async (req, res, next) => {
  try {
    const list = store.attendance.filter((a) => a.subjectId === req.params.subjectId || a.subjectCode === req.params.subjectId);
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

const createAttendance = async (req, res, next) => {
  try {
    const { studentId, subjectId, subjectCode, subjectName, attendedClasses, totalClasses } = req.body;
    
    const attended = parseInt(attendedClasses) || 0;
    const total = parseInt(totalClasses) || 1;
    const pct = parseFloat(((attended / total) * 100).toFixed(1));

    let status = 'Good';
    if (pct < 65) status = 'Low';
    else if (pct < 75) status = 'Warning';

    const newRecord = {
      id: `att-${Date.now()}`,
      studentId: studentId || 'STU-2026-042',
      subjectId: subjectId || 'sub-1',
      subjectCode: subjectCode || 'CS301',
      subjectName: subjectName || 'Advanced Web Development',
      attendedClasses: attended,
      totalClasses: total,
      percentage: pct,
      status
    };

    store.attendance.push(newRecord);
    res.status(201).json({ success: true, data: newRecord });
  } catch (error) {
    next(error);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const index = store.attendance.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Attendance record not found with ID ${req.params.id}`);
    }

    const updated = { ...store.attendance[index], ...req.body };
    if (updated.attendedClasses !== undefined && updated.totalClasses !== undefined) {
      updated.percentage = parseFloat(((updated.attendedClasses / updated.totalClasses) * 100).toFixed(1));
      if (updated.percentage < 65) updated.status = 'Low';
      else if (updated.percentage < 75) updated.status = 'Warning';
      else updated.status = 'Good';
    }

    store.attendance[index] = updated;
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const index = store.attendance.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Attendance record not found with ID ${req.params.id}`);
    }

    const removed = store.attendance.splice(index, 1);
    res.status(200).json({ success: true, message: 'Attendance record deleted', data: removed[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAttendance,
  getAttendanceByStudent,
  getAttendanceBySubject,
  createAttendance,
  updateAttendance,
  deleteAttendance
};
