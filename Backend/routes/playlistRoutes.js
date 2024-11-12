const express = require('express');
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protected route to create a playlist - requires authentication
router.post('/create', authMiddleware, playlistController.createPlaylist);

// Protected route to get a user's playlists
router.get('/my-playlists', authMiddleware, playlistController.getUserPlaylists);

module.exports = router;