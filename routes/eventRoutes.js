const express = require('express');
const router = express.Router();
const { 
  getEvents, 
  getEventById, // 1. Import the new function
  createEvent, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getEvents).post(protect, createEvent);

// 2. Add the public GET method to the existing '/:id' route
router
  .route('/:id')
  .get(getEventById) // This makes it a public route for fetching
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;