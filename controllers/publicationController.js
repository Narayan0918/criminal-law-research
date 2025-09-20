const asyncHandler = require('express-async-handler');
const Publication = require('../models/Publication');

// @desc    Get all publications
// @route   GET /api/publications
// @access  Public
const getPublications = asyncHandler(async (req, res) => {
  const publications = await Publication.find({}).sort({ publicationYear: -1 });
  res.status(200).json(publications);
});

// @desc    Create a publication
// @route   POST /api/publications
// @access  Private/Admin
const createPublication = asyncHandler(async (req, res) => {
  const { title, authors, abstract, publicationYear, link } = req.body;
  if (!title || !authors || !publicationYear || !link) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  const publication = await Publication.create({ title, authors, abstract, publicationYear, link });
  res.status(201).json(publication);
});

// @desc    Update a publication
// @route   PUT /api/publications/:id
// @access  Private/Admin
const updatePublication = asyncHandler(async (req, res) => {
    const publication = await Publication.findById(req.params.id);
    if(!publication) {
        res.status(404);
        throw new Error('Publication not found');
    }
    const updatedPublication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPublication);
});

// @desc    Delete a publication
// @route   DELETE /api/publications/:id
// @access  Private/Admin
const deletePublication = asyncHandler(async (req, res) => {
    const publication = await Publication.findById(req.params.id);
    if(!publication) {
        res.status(404);
        throw new Error('Publication not found');
    }
    await publication.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Publication removed' });
});

module.exports = { getPublications, createPublication, updatePublication, deletePublication };