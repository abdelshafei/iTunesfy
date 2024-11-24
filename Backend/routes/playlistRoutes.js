const express = require('express');
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protected route to create a playlist - requires authentication
// router.post('/create/:listenername', authMiddleware, playlistController.createPlaylist);

// Protected route to get a user's playlists
router.get('/ownPlaylist/:listenername', authMiddleware, playlistController.getUserPlaylists);

router.get('/liked-playlists/:listenername', authMiddleware, playlistController.getUserLikedPlaylists);

router.get('/:playlistName/:UserId', authMiddleware, playlistController.getPlaylistSongs);

router.get('/incPlayCount/:playlistName/:UserId', authMiddleware, playlistController.incPlaylistPlayCount)

// router.get('/remove-LikedPlaylist/:listenername', authMiddleware, playlistController.removeUserLikedPlaylists)

// router.get('/add-LikedPlaylist/:listenername', authMiddleware, playlistController.addUserLikedPlaylists)

module.exports = router;