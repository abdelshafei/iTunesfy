// router.get('/remove-LikedPlaylist/:listenerId', authMiddleware, playlistController.removeUserLikedPlaylists)
// router.get('/add-LikedPlaylist/:listenerId', authMiddleware, playlistController.addUserLikedPlaylists)
const db = require('../config/db');

exports.createPlaylist = async (req, res) => {
    const {albumTitle} = req.body;
    const listenerId = req.params.listenername;

    //create playlist
};

exports.getUserPlaylists = async (req, res) => {
    const listenerId = req.params.listenername;

    // Query to retrieve albums by artist ID
    const query = `SELECT * FROM PlayList WHERE username = ?`;
    db.all(query, [listenername], (err, rows) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ message: "Failed to retrieve playlist" });
      }
  
      res.status(200).json(rows); // Send back the retrieved albums
    });
};

exports.getUserLikedPlaylists = async(req, res) => {
    const listenerId = req.params.listenername;

    // Query to retrieve albums by artist ID
    const query = `
    SELECT PlayList.* 
    FROM Listeners 
    JOIN PlayListLikes_Listeners ON Listeners.user_id = PlayListLikes_Listeners.user_id
    JOIN PlayList ON PlayListLikes_Listeners.playlist_name = PlayList.playlist_name
    WHERE Listeners.userName = ?
    `;
    db.all(query, [listenername], (err, rows) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ message: "Failed to retrieve playlist" });
      }
  
      res.status(200).json(rows); // Send back the retrieved albums
    });
};
