// router.get('/remove-LikedPlaylist/:listenerId/:', authMiddleware, playlistController.removeUserLikedPlaylists)
// router.get('/add-LikedPlaylist/:listenerId', authMiddleware, playlistController.addUserLikedPlaylists)
const db = require('../config/db');

exports.createPlaylist = async (req, res) => {
  const {playlistName, UserId} = req.params;

  const query = `
  INSERT OR IGNORE INTO Playlist(user_id, playlist_name, play_counter) VALUES (?, ?, ?)
  `

  db.run(query, [Math.floor(UserId), playlistName, 0], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to add playlist" });
    }

    res.status(200).json({ message: "Playlist created!" });

  });
};

exports.removePlaylist = async (req, res) => {
  const {playlistName, UserId} = req.params;

  const query1 = `
  DELETE FROM Playlist
  WHERE user_id = ? AND playlist_name = ?
  `

  const query2 = `
  DELETE FROM Playlist_Song
  WHERE user_id = ? AND playlist_name = ?
  `

  db.run(query1, [Math.floor(UserId), playlistName], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to remove playlist" });
    }

    db.run(query2, [Math.floor(UserId), playlistName], (err) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ message: "Failed to remove playlist" });
      }

      res.status(200).json({ message: "Playlist removed." });
    });

  });
};

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
  const { playlistName, UserId } = req.params;

  const query = `
    SELECT s.*
    FROM Song s
    INNER JOIN Playlist_Song ps ON s.song_id = ps.song_id
    WHERE ps.user_id = ? AND ps.playlist_name = ?
  `;

  db.all(query, [Math.floor(UserId), playlistName], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to retrieve playlist" });
    }

    res.status(200).json(rows);
  });

};

exports.incPlaylistPlayCount = async(req, res) => {
  const { playlistName, UserId } = req.params;

  const query = `
  UPDATE Playlist SET play_counter = play_counter + 1 
  WHERE user_id = ? AND playlist_name = ?
  `

  db.run(query, [UserId, playlistName], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to increment playlist play counter" });
    }

    if (this.change == 0) {
      console.log("no changes")
      return res.status(400).json({ message: "no play counter has updated!" });
    }


    res.status(200).json({message: "play counter updated"});
  });
}

exports.addSong = (req, res) => {
  const {songId, playlistName, UserId} = req.params

  const query = `INSERT OR IGNORE INTO Playlist_Song(song_id, user_id, playlist_name) VALUES (?, ?, ?)`

  db.run(query, [songId, Math.floor(UserId), playlistName], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to add to playlist" });
    }

    if (this.change == 0) {
      return res.status(400).json({ message: "playlist has not been updated!" });
    }

    res.status(200).json({ message: "Playlist updated!" });

  });

};

exports.removeSong = (req, res) => {
  const {songId, playlistName, UserId} = req.params

  const query = `
  DELETE FROM Playlist_Song 
  WHERE song_id = ? AND playlist_name = ? AND user_id = ?
  `

  db.run(query, [Math.floor(songId), playlistName, Math.floor(UserId)], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to remove from playlist" });
    }

    if (this.change == 0) {
      return res.status(400).json({ message: "playlist has not been updated!" });
    }

    res.status(200).json({ message: "Playlist updated!" });

  });
};
