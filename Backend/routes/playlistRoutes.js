const express = require('express');
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protected route to create a playlist - requires authentication
router.post('/create', authMiddleware, playlistController.createPlaylist);

// Protected route to get a user's playlists
router.get('/my-playlists', authMiddleware, playlistController.getUserPlaylists);

router.get('/my-Liked-Playlists', authMiddleware, playlistController.getUserLikedPlaylists)

router.get('/remove-LikedPlaylist', authMiddleware, playlistController.removeUserLikedPlaylists)

router.get('/add-LikedPlaylist', authMiddleware, playlistController.addUserLikedPlaylists)

module.exports = router;