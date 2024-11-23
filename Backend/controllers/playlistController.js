// router.get('/remove-LikedPlaylist/:listenerId/:', authMiddleware, playlistController.removeUserLikedPlaylists)
// router.get('/add-LikedPlaylist/:listenerId', authMiddleware, playlistController.addUserLikedPlaylists)
const db = require('../config/db');

// exports.createPlaylist = async (req, res) => {
//     const {albumTitle} = req.body;
//     const listenerId = req.params.listenername;

//     //create playlist
// };

exports.getUserPlaylists = async (req, res) => {
  const listenername = req.params.listenername;

  console.log(req.params)

  // Query to retrieve albums by artist ID
  const query = `
  SELECT PlayList.* 
  FROM PlayList 
  JOIN Listeners ON PlayList.user_id = Listeners.user_id
  WHERE Listeners.userName = ?;
  `;
  db.all(query, [listenername], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to retrieve playlist" });
    }

    res.status(200).json(rows); // Send back the retrieved albums
  });
};

exports.getUserLikedPlaylists = async(req, res) => {
  const listenername = req.params.username;

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

exports.getPlaylistSongs = async(req, res) => {
  const { PlaylistName, userId } = req.params;

  const query = `
    SELECT s.*
    FROM Playlist_Song ps
    INNER JOIN Song s ON ps.song_id = s.song_id
    WHERE ps.user_id = ? AND ps.playlist_name = ?
  `;

  db.all(query, [userId], [PlaylistName], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to retrieve playlist" });
    }

    res.status(200).json(rows);
  });

};
