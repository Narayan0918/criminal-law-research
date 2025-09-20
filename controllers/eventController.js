const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ eventDate: 1 }); // Sort by upcoming
  res.status(200).json(events);
});

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, eventDate, location } = req.body;
  if (!title || !description || !eventDate) {
    res.status(400);
    throw new Error('Title, description, and event date are required');
  }
  const event = await Event.create({ title, description, eventDate, location });
  res.status(201).json(event);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if(!event) {
        res.status(404);
        throw new Error('Event not found');
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if(!event) {
        res.status(404);
        throw new Error('Event not found');
    }
    await event.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Event removed' });
});

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };