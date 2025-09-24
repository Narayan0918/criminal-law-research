// routes/publicationRoutes.js

const express = require('express');
const router = express.Router();
const { 
  getPublications, 
  getPublicationById,
  createPublication, 
  updatePublication, 
  deletePublication,
} = require('../controllers/publicationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPublications).post(protect, createPublication);

router
  .route('/:id')
  .get(getPublicationById)
  .put(protect, updatePublication)
  .delete(protect, deletePublication);

module.exports = router;