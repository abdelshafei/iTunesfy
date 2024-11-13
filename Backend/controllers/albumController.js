const db = require('../config/db');

exports.createAlbum = async (req, res) => {
    try {
      const albumTitle = req.body;
      const artistId = req.params.artistId;

      // Basic validation to ensure necessary data is present
      if (!albumTitle || !authentication_id) {
        return res.status(400).json({ message: "Album title and artist ID are required." });
      }
  
      // Prepare and execute the SQL query to insert the album
      const query = `INSERT INTO Album (album_title, authentication_id) VALUES (?, ?)`;
      db.run(query, [albumTitle, authentication_id], function (err) {
        if (err) {
          console.error("Database error:", err.message);
          return res.status(500).json({ message: "Failed to create album." });
        }
  
        // Send a success response with the new album ID
        res.status(201).json({
          message: "Album created successfully.",
          albumId: this.lastID, // `lastID` provides the ID of the inserted album
        });
      });
    } catch (error) {
      console.error("Error creating album:", error);
      res.status(500).json({ message: "Internal server error." });
    }
};

exports.getAlbumsByArtist = (req, res) => {
    const artistId = req.params.artistId;
  
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