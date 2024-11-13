const express = require('express');
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protected route to create a playlist - requires authentication
router.post('/create', authMiddleware, playlistController.createPlaylist);

// Protected route to get a user's playlists
router.get('/ownPlaylist/:listenerId', authMiddleware, playlistController.getUserPlaylists);

router.get('/liked-playlists/::listenerId', authMiddleware, playlistController.getUserLikedPlaylists)

router.get('/remove-LikedPlaylist/:listenerId', authMiddleware, playlistController.removeUserLikedPlaylists)

router.get('/add-LikedPlaylist/:listenerId', authMiddleware, playlistController.addUserLikedPlaylists)

module.exports = router;