const db = require('../config/db');

exports.getUserAlbum = (req, res) => {
  const artistId  = req.params.artistId;
  
    // Query to retrieve albums by artist ID
    const query = `SELECT * FROM Album WHERE authentication_id = ?`;
    db.all(query, [artistId], (err, rows) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ message: "Failed to retrieve albums" });
      }
  
      res.status(200).json(rows); // Send back the retrieved albums
    });
};

exports.getAlbumSongs = (req, res) => {
  const { albumId } = req.params;

  const query = `SELECT * FROM Song WHERE album_id = ?`;
  db.all(query, [albumId], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ message: 'Failed to fetch songs.' });
    }
    res.status(200).json(rows);
  });
};

exports.getArtistAlbums = (req, res) => {
  const { artistId } = req.params;

  const query = `SELECT * FROM Album WHERE authentication_id = ?`
  db.all(query, [artistId], (err, rows) => {
    if(err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ message: 'Failed to fetch albums.' });
    }
    res.status(200).json(rows);
  });
};