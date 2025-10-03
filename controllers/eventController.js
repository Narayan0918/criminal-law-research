const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');

// @desc    Get all events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ eventDate: 1 });
  res.status(200).json(events);
});

// START: Add this new function
// @desc    Get a single event by ID
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});
// END: Add this new function

// @desc    Create an event
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
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if(!event) {
        res.status(404);
        throw new Error('Event not found');
    }
    await event.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Event removed' });
});

// Add getEventById to the export list
module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };