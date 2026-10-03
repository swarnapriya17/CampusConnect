const store = require('../services/inMemoryStore');

const getSubjects = async (req, res, next) => {
  try {
    const { search } = req.query;
    let result = [...store.subjects];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.faculty.toLowerCase().includes(q)
      );
    }
    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

const getSubjectById = async (req, res, next) => {
  try {
    const sub = store.subjects.find((s) => s.id === req.params.id);
    if (!sub) {
      res.status(404);
      throw new Error(`Subject not found with ID ${req.params.id}`);
    }
    res.status(200).json({ success: true, data: sub });
  } catch (error) {
    next(error);
  }
};

const createSubject = async (req, res, next) => {
  try {
    const { code, name, faculty, credits, semester, department, schedule } = req.body;
    if (!code || !name) {
      res.status(400);
      throw new Error('Please enter subject code and title');
    }

    const newSubject = {
      id: `sub-${Date.now()}`,
      code,
      name,
      faculty: faculty || 'Unassigned Faculty',
      credits: parseInt(credits) || 3,
      semester: semester || 'Semester 1',
      department: department || 'General',
      schedule: schedule || 'TBD'
    };

    store.subjects.push(newSubject);
    res.status(201).json({ success: true, data: newSubject });
  } catch (error) {
    next(error);
  }
};

const updateSubject = async (req, res, next) => {
  try {
    const index = store.subjects.findIndex((s) => s.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Subject not found with ID ${req.params.id}`);
    }
    store.subjects[index] = { ...store.subjects[index], ...req.body };
    res.status(200).json({ success: true, data: store.subjects[index] });
  } catch (error) {
    next(error);
  }
};

const deleteSubject = async (req, res, next) => {
  try {
    const index = store.subjects.findIndex((s) => s.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Subject not found with ID ${req.params.id}`);
    }
    const removed = store.subjects.splice(index, 1);
    res.status(200).json({ success: true, message: 'Subject removed', data: removed[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};
