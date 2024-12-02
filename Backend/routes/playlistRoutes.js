const express = require('express');
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

router.get('/createPlaylist/:playlistName/:UserId', authMiddleware, playlistController.createPlaylist);

router.get('/removePlaylist/:playlistName/:UserId', authMiddleware, playlistController.removePlaylist)

router.get('/ownPlaylist/:listenername', authMiddleware, playlistController.getUserPlaylists);

router.get('/liked-playlists/:UserId', authMiddleware, playlistController.getUserLikedPlaylists);

router.get('/:playlistName/:UserId', authMiddleware, playlistController.getPlaylistSongs);

router.get('/incPlayCount/:playlistName/:UserId', authMiddleware, playlistController.incPlaylistPlayCount);

router.get('/addSong/:songId/:playlistName/:UserId', authMiddleware, playlistController.addSong);

router.get('/removeSong/:songId/:playlistName/:UserId', authMiddleware, playlistController.removeSong);

router.get('/addToLikedPlaylists/:playlistName/:UserId/:LikedUserId', authMiddleware, playlistController.addLikedPlaylist);

router.get('/removeFromLikedPlaylists/:playlistName/:UserId/:LikedUserId', authMiddleware, playlistController.removeLikedPlaylist);

//return this.http.get<any[]>(`${this.apiUrl}/playlists/likesOfPlaylist/${playlistName}/${userId}`, { headers });
router.get('/likesOfPlaylist/:playlistName/:UserId', authMiddleware, playlistController.getLikeCounter);

module.exports = router;