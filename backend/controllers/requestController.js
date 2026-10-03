const store = require('../services/inMemoryStore');

const getRequests = async (req, res, next) => {
  try {
    const { search, status, type } = req.query;
    let result = [...store.requests];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) => r.id.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q)
      );
    }

    if (status && status !== 'All') {
      result = result.filter((r) => r.status === status);
    }

    if (type && type !== 'All') {
      result = result.filter((r) => r.type === type);
    }

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

const getRequestById = async (req, res, next) => {
  try {
    const reqItem = store.requests.find((r) => r.id === req.params.id);
    if (!reqItem) {
      res.status(404);
      throw new Error(`Request ticket not found with ID ${req.params.id}`);
    }
    res.status(200).json({ success: true, data: reqItem });
  } catch (error) {
    next(error);
  }
};

const createRequest = async (req, res, next) => {
  try {
    const { type, subject, description, priority } = req.body;
    if (!subject || !description) {
      res.status(400);
      throw new Error('Please provide request subject and description');
    }

    const newRequest = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      type: type || 'General',
      subject,
      description,
      priority: priority || 'Medium',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      response: 'Under review by administration.'
    };

    store.requests.unshift(newRequest);
    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    next(error);
  }
};

const updateRequest = async (req, res, next) => {
  try {
    const index = store.requests.findIndex((r) => r.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Request ticket not found with ID ${req.params.id}`);
    }

    store.requests[index] = { ...store.requests[index], ...req.body };
    res.status(200).json({ success: true, data: store.requests[index] });
  } catch (error) {
    next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  try {
    const index = store.requests.findIndex((r) => r.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Request ticket not found with ID ${req.params.id}`);
    }

    const removed = store.requests.splice(index, 1);
    res.status(200).json({ success: true, message: 'Request ticket deleted', data: removed[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest
};
