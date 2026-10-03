const store = require('../services/inMemoryStore');

const getEvents = async (req, res, next) => {
  try {
    const { search, category, timeStatus } = req.query;
    let result = [...store.events];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) => e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      result = result.filter((e) => e.category === category);
    }

    if (timeStatus && timeStatus !== 'All') {
      result = result.filter((e) => e.timeStatus === timeStatus);
    }

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const evt = store.events.find((e) => e.id === req.params.id);
    if (!evt) {
      res.status(404);
      throw new Error(`Event not found with ID ${req.params.id}`);
    }
    res.status(200).json({ success: true, data: evt });
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const { name, date, time, location, organizer, category, capacity, description } = req.body;
    if (!name || !location) {
      res.status(400);
      throw new Error('Please enter event name and location');
    }

    const newEvent = {
      id: `evt-${Date.now()}`,
      name,
      date: date || '2026-11-20',
      time: time || '10:00 AM - 04:00 PM',
      location,
      organizer: organizer || 'Department of Student Affairs',
      category: category || 'Technical',
      timeStatus: 'Upcoming',
      capacity: parseInt(capacity) || 300,
      description: description || ''
    };

    store.events.unshift(newEvent);
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const index = store.events.findIndex((e) => e.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Event not found with ID ${req.params.id}`);
    }

    store.events[index] = { ...store.events[index], ...req.body };
    res.status(200).json({ success: true, data: store.events[index] });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const index = store.events.findIndex((e) => e.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Event not found with ID ${req.params.id}`);
    }

    const removed = store.events.splice(index, 1);
    res.status(200).json({ success: true, message: 'Event deleted', data: removed[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
