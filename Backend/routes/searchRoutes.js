const express = require('express');
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protected route to get a user's playlists
router.get('', authMiddleware, searchController.getSearchTerms);

module.exports = router;