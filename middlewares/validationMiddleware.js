
const priorityEnum = require('../constants/priority');
const PRIORITY_VALUES = Object.values(priorityEnum);
// Validation middleware
function validateTask(req, res, next) {
  const { title, description, completed, priority } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Description is required and must be a non-empty string' });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean' });
  }

  if (priority !== undefined && !PRIORITY_VALUES.includes(priority)) {
    return res.status(400).json({
      error: `Priority must be one of: ${PRIORITY_VALUES.join(', ')}`
    });
  }

  next();
}

module.exports = {
  validateTask,
  PRIORITY_VALUES
};