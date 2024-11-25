const db = require('../config/db');

exports.getSearchTerms = (req, res) => {
  const term = req.params.searchTerm; // Use query parameter `q` for the search term

  // Add wildcards to the search term for partial matching
  const query = `%${term}%`;


  // SQL query to search across multiple tables with partial matching
  const sql = `
    SELECT 'artist' AS type, userName AS name, style, authentication_id AS auth FROM Artists WHERE userName LIKE ?
    UNION ALL
    SELECT 'album' AS type, album_title AS name, authentication_id, album_id FROM Album WHERE album_title LIKE ?
    UNION ALL
    SELECT 'song' AS type, song_title AS name, duration, song_id FROM Song WHERE song_title LIKE ?
    UNION ALL
    SELECT 'playlist' AS type, playlist_name AS name, user_id, user_id FROM PlayList WHERE playlist_name LIKE ?
  `;

  // Execute the query with the same term used for each LIKE condition
  db.all(sql, [query, query, query, query], (err, rows) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Failed to retrieve search results" });
    }

    // Send back the search results
    res.status(200).json(rows);
  });
};

exports.getSongsForPlaylist = (req, res) => {
  const {playlistName, userId, searchTerm} = req.params

  const query = `
  SELECT * FROM song 
  WHERE 
  `
}