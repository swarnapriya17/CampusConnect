const mongoose = require('mongoose');
const User = require('../models/User');
const store = require('../services/inMemoryStore');

const getStudents = async (req, res, next) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = { role: 'student' };

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { studentId: { $regex: search, $options: 'i' } }
        ];
      }

      if (department && department !== 'All') {
        query.department = department;
      }

      const total = await User.countDocuments(query);
      const students = await User.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: students.length,
        total,
        page: parseInt(page),
        data: students
      });
    }

    // Fallback store
    let result = store.students;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
      );
    }
    if (department && department !== 'All') {
      result = result.filter((s) => s.department === department);
    }

    res.status(200).json({
      success: true,
      count: result.length,
      total: result.length,
      page: parseInt(page),
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const student = await User.findById(req.params.id);
      if (!student) {
        res.status(404);
        throw new Error(`Student not found with ID ${req.params.id}`);
      }
      return res.status(200).json({ success: true, data: student });
    }

    const student = store.students.find((s) => s.id === req.params.id);
    if (!student) {
      res.status(404);
      throw new Error(`Student not found with ID ${req.params.id}`);
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const { name, email, rollNo, department, year, section } = req.body;
    if (!name || !email) {
      res.status(400);
      throw new Error('Please provide student name and email');
    }

    if (mongoose.connection.readyState === 1) {
      const newStudent = await User.create({
        name,
        email,
        studentId: rollNo || `STU-2026-${Math.floor(100 + Math.random() * 900)}`,
        password: '$2a$10$defaultPasswordHash',
        role: 'student',
        department: department || 'Computer Science & Engineering',
        year: year || '1st Year',
        section: section || 'A'
      });
      return res.status(201).json({ success: true, data: newStudent });
    }

    const fallbackStudent = {
      id: `STU-2026-${Math.floor(100 + Math.random() * 900)}`,
      rollNo: rollNo || `21CS${Math.floor(10 + Math.random() * 90)}`,
      name,
      email,
      department: department || 'Computer Science & Engineering',
      year: year || '1st Year',
      section: section || 'A',
      status: 'Active',
      attendance: '100%',
      gpa: 'N/A'
    };
    store.students.unshift(fallbackStudent);
    res.status(201).json({ success: true, data: fallbackStudent });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updated) {
        res.status(404);
        throw new Error(`Student not found with ID ${req.params.id}`);
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const index = store.students.findIndex((s) => s.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Student not found with ID ${req.params.id}`);
    }
    store.students[index] = { ...store.students[index], ...req.body };
    res.status(200).json({ success: true, data: store.students[index] });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const removed = await User.findByIdAndDelete(req.params.id);
      if (!removed) {
        res.status(404);
        throw new Error(`Student not found with ID ${req.params.id}`);
      }
      return res.status(200).json({ success: true, message: 'Student record deleted', data: removed });
    }

    const index = store.students.findIndex((s) => s.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Student not found with ID ${req.params.id}`);
    }
    const removed = store.students.splice(index, 1);
    res.status(200).json({ success: true, message: 'Student record deleted', data: removed[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
