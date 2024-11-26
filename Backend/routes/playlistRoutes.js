const express = require('express');
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

router.get('/createPlaylist/:playlistName/:UserId', authMiddleware, playlistController.createPlaylist);

router.get('/ownPlaylist/:listenername', authMiddleware, playlistController.getUserPlaylists);

router.get('/liked-playlists/:listenername', authMiddleware, playlistController.getUserLikedPlaylists);

router.get('/:playlistName/:UserId', authMiddleware, playlistController.getPlaylistSongs);

router.get('/incPlayCount/:playlistName/:UserId', authMiddleware, playlistController.incPlaylistPlayCount);

router.get('/addSong/:songId/:playlistName/:UserId', authMiddleware, playlistController.addSong);

router.get('/removeSong/:songId/:playlistName/:UserId', authMiddleware, playlistController.removeSong);

module.exports = router;