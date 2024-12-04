const db = require('../config/db');
const { methodLogger } = require("../utils/logger");

exports.createPlaylist = async (req, res) => {
  const {playlistName, UserId} = req.params;

  const query = `
  INSERT OR IGNORE INTO Playlist(user_id, playlist_name, play_counter) VALUES (?, ?, ?)
  `

  db.run(query, [Math.floor(UserId), playlistName, 0], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ message: "Failed to add playlist" });
      methodLogger(req, res);
      return;
    }

    res.status(200).json({ message: "Playlist created!" });
    methodLogger(req, res);
    return;
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
      res.status(500).json({ message: "Failed to remove playlist" });
      methodLogger(req, res);
      return;
    }

    db.run(query2, [Math.floor(UserId), playlistName], (err) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ message: "Failed to remove playlist" });
        methodLogger(req, res);
        return;
      }

      res.status(200).json({ message: "Playlist removed." });
      methodLogger(req, res);
      return;
    });
  });
};

exports.getUserPlaylists = async (req, res) => {
  const listenername = req.params.listenername;

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
      res.status(500).json({ message: "Failed to retrieve playlist" });
      methodLogger(req, res);
      return;
    }

    res.status(200).json(rows); // Send back the retrieved albums
    methodLogger(req, res);
    return;
  });
};

exports.getUserLikedPlaylists = async(req, res) => {
  const userId = req.params.UserId;

  const query = `
  SELECT playlist_name, user_id 
  FROM Playlist_Like 
  WHERE userLiked_id = ?
  `;
  db.all(query, userId, (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ message: "Failed to retrieve Liked playlist" });
      methodLogger(req, res);
      return;
    }

    res.status(200).json(rows);
    methodLogger(req, res);
    return;
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
      res.status(500).json({ message: "Failed to retrieve playlist" });
      methodLogger(req, res);
      return;
    }

    res.status(200).json(rows);
    methodLogger(req, res);
    return;
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
      res.status(500).json({ message: "Failed to increment playlist play counter" });
      methodLogger(req, res);
      return;
    }

    if (this.change == 0) {
      console.log("no changes")
      res.status(400).json({ message: "no play counter has updated!" });
      methodLogger(req, res);
      return;
    }


    res.status(200).json({message: "play counter updated"});
    methodLogger(req, res);
    return;
  });

}

exports.addSong = (req, res) => {
  const {songId, playlistName, UserId} = req.params

  const query = `INSERT OR IGNORE INTO Playlist_Song(song_id, user_id, playlist_name) VALUES (?, ?, ?)`

  db.run(query, [songId, Math.floor(UserId), playlistName], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ message: "Failed to add to playlist" });
      methodLogger(req, res);
      return;
    }

    if (this.change == 0) {
      res.status(400).json({ message: "playlist has not been updated!" });
      methodLogger(req, res);
      return;
    }

    res.status(200).json({ message: "Playlist updated!" });
    methodLogger(req, res);
    return;
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
      res.status(500).json({ message: "Failed to remove from playlist" });
      methodLogger(req, res);
      return;
    }

    if (this.change == 0) {
      res.status(400).json({ message: "playlist has not been updated!" });
      methodLogger(req, res);
      return;
    }

    res.status(200).json({ message: "Playlist updated!" });      
    methodLogger(req, res);
    return;

  });

};

exports.addLikedPlaylist = (req, res) => {
  const {playlistName, UserId, LikedUserId} = req.params

  const nextLikedIdQuery = `
    SELECT COUNT(Liked_id) + 1 AS nextLikedId
    FROM Playlist_Like
    WHERE user_id = ? AND playlist_name = ?
  `

  const insertQuery = `INSERT OR IGNORE INTO Playlist_Like(user_id, playlist_name, Liked_id, userLiked_id) VALUES (?, ?, ?, ?)`

  db.get(nextLikedIdQuery, [UserId, playlistName], (err, row) => {
    if(err) {
      console.error(err);
      res.status(400).json({Message: err});
      methodLogger(req, res);
      return;
    }

    const nextLikedId = row.nextLikedId;

    db.run(insertQuery, [UserId, playlistName, nextLikedId, LikedUserId], (err) => {
      if(err) {
        console.error(err);
        res.status(400).json({Message: err});
        methodLogger(req, res);
        return;
      }

      res.status(200).json({Message: "Playlist like added!"});
      methodLogger(req, res);
      return;
    });
  });

}

exports.removeLikedPlaylist = (req, res) => {
  const {playlistName, UserId, LikedUserId} = req.params

  const currLikedIdQuery = `
  SELECT Liked_id 
  FROM Playlist_Like
  WHERE user_id = ? AND playlist_name = ? AND userLiked_id = ?
  `

  const updateLikedIdsQuery = `
  UPDATE Playlist_Like SET Liked_id = Liked_id - 1 
  WHERE user_id = ?
    AND playlist_name = ? 
    AND Liked_id > ?
  `

  const DeleteQuery = `
    DELETE FROM Playlist_Like 
    WHERE user_id = ? AND playlist_name = ? AND userLiked_id = ? 
  `

  db.get(currLikedIdQuery, [Math.floor(UserId), playlistName, Math.floor(LikedUserId)], (err, row) => {
    if(err) {
      console.error(err);
      res.status(400).json({Message: err});
      methodLogger(req, res);
      return;
    }

    const currLikedId = row.Liked_id

    db.run(DeleteQuery, [Math.floor(UserId), playlistName, Math.floor(LikedUserId)], (err) => {
      if(err) {
        console.error(err);
        res.status(400).json({Message: err});
        methodLogger(req, res);
        return;
      }

      db.run(updateLikedIdsQuery, [Math.floor(UserId), playlistName, Math.floor(currLikedId)], (err) => {
        if(err) {
          console.error(err);
          res.status(400).json({Message: err});
          methodLogger(req, res);
          return;
        }

        res.status(200).json({Message: "Liked Playlist removed"});
        methodLogger(req, res);
        return;
      });
    });
  });

}

exports.getLikeCounter = (req, res) => {
  const {playlistName, UserId} = req.params

  const Query = `
  SELECT COUNT(*) AS likedCounter
  FROM Playlist_Like
  WHERE user_id = ?
    AND playlist_name = ?
  `

  db.get(Query, [UserId, playlistName], (err, row) => {
    if(err) {
      console.error(err);
      res.status(400).json({Message: err})
      methodLogger(req, res);
      return;
    }

    res.status(200).json(row.likedCounter);
    methodLogger(req, res);
    return;
  })

}
