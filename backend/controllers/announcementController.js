const store = require('../services/inMemoryStore');

const getAnnouncements = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let result = [...store.announcements];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      result = result.filter((a) => a.category === category);
    }

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

const getAnnouncementById = async (req, res, next) => {
  try {
    const anc = store.announcements.find((a) => a.id === req.params.id);
    if (!anc) {
      res.status(404);
      throw new Error(`Announcement not found with ID ${req.params.id}`);
    }
    res.status(200).json({ success: true, data: anc });
  } catch (error) {
    next(error);
  }
};

const createAnnouncement = async (req, res, next) => {
  try {
    const { title, description, category, priority, author } = req.body;
    if (!title || !description) {
      res.status(400);
      throw new Error('Please enter announcement title and description');
    }

    const newAnnouncement = {
      id: `anc-${Date.now()}`,
      title,
      description,
      date: new Date().toISOString().split('T')[0],
      category: category || 'General',
      priority: priority || 'Medium',
      author: author || 'Office of Academic Affairs'
    };

    store.announcements.unshift(newAnnouncement);
    res.status(201).json({ success: true, data: newAnnouncement });
  } catch (error) {
    next(error);
  }
};

const updateAnnouncement = async (req, res, next) => {
  try {
    const index = store.announcements.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Announcement not found with ID ${req.params.id}`);
    }

    store.announcements[index] = { ...store.announcements[index], ...req.body };
    res.status(200).json({ success: true, data: store.announcements[index] });
  } catch (error) {
    next(error);
  }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    const index = store.announcements.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      res.status(404);
      throw new Error(`Announcement not found with ID ${req.params.id}`);
    }

    const removed = store.announcements.splice(index, 1);
    res.status(200).json({ success: true, message: 'Announcement deleted', data: removed[0] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
