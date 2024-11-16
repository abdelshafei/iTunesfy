const axios = require('axios');
const db = require('../config/db');

const searchTerms = require('../config/iTunesTerms'); // Import hard-wired search terms

// Function to fetch and save data for predefined search terms
const fetchAndSaveItunesData = async () => {
    for (const [artistName, authId] of Object.entries(searchTerms)) {
      console.log(`Fetching data for: ${artistName} with authentication ID: ${authId}`);

        try {
            // Fetch data from iTunes API for each term
            const response = await axios.get(`https://itunes.apple.com/search`, {
                params: {
                    term: artistName,
                    media: 'music',
                    entity: 'album',
                    limit: 10 // Limit the number of results per term
                }
            });

            const results = response.data.results;

            if (results.length === 0) {
                console.log(`No results found for ${artistName}.`);
                continue;
            }

            // Process and insert data into the database
            results.forEach((item) => {
                const artistName = item.artistName;
                const albumTitle = item.collectionName;
                const songTitle = item.trackName;
                const duration = item.trackTimeMillis;
                const albumId = item.collectionId;
                const songId = item.trackId;

                // Insert artist if not already in Artists table
                db.run(
                    `INSERT OR IGNORE INTO Artists (userName, authentication_id, email, password, country, style) VALUES (?, ?, ?, ?, ?, ?)`,
                    [artistName, authId, `${artistName}@gmail.com`, 'hashed_password', 'Unknown', 'Music'], // Adjust fields as needed
                    (err) => {
                        if (err) {
                            console.error("Error inserting artist:", err.message);
                        }
                    }
                );

                // Insert album if not already in Album table
                db.run(
                    `INSERT OR IGNORE INTO Album (album_id, album_title, authentication_id) VALUES (?, ?, ?)`,
                    [albumId, albumTitle, authId],
                    (err) => {
                        if (err) {
                            console.error("Error inserting album:", err.message);
                        }
                    }
                );

                // Insert song into Song table with reference to album_id
                db.run(
                    `INSERT OR IGNORE INTO Song (song_id, song_title, duration, album_id) VALUES (?, ?, ?, ?)`,
                    [songId, songTitle, duration, albumId],
                    (err) => {
                        if (err) {
                            console.error("Error inserting song:", err.message);
                        }
                    }
                );
            });

            console.log(`${results.length} items fetched for "${artistName}" and saved to the database.`);
        } catch (error) {
            console.error(`Error fetching data for ${artistName}:`, error.message);
        }
    }

    console.log("Data fetching and saving completed for all terms.");
};

module.exports = { fetchAndSaveItunesData };
