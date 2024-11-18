const express = require('express');
const albumController = require('../controllers/albumController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Protected route to get a user's playlists
router.get('/artist/:artistId', authMiddleware, albumController.getUserAlbum);

router.get('/artist/:albumId', authMiddleware, albumController.getAlbumSongs);

module.exports = router;