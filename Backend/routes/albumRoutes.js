const express = require('express');
const albumController = require('../controllers/albumController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protected route to create a playlist - requires authentication
router.get('/create/:artistId', authMiddleware, albumController.createAlbum);

// Protected route to get a user's playlists
router.get('/artist/:artistId', authMiddleware, albumController.getUserAlbum);

module.exports = router;