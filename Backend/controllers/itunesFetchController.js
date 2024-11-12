const axios = require('axios');
const db = require('../config/db');
const searchTerms = require('../config/itunesTerms'); // Import hard-wired search terms

// Function to fetch and save data for predefined search terms
const fetchAndSaveItunesData = async () => {
    for (const term of searchTerms) {
        console.log(`Fetching data for: ${term}`);

        try {
            // Fetch data from iTunes API for each term
            const response = await axios.get(`https://itunes.apple.com/search`, {
                params: {
                    term: term,
                    media: 'music',
                    entity: 'album',
                    limit: 10 // Limit the number of results per term
                }
            });

            const results = response.data.results;

            if (results.length === 0) {
                console.log(`No results found for ${term}.`);
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
                    `INSERT OR IGNORE INTO Artists (userName, email, password, country, style) VALUES (?, ?, ?, ?, ?, ?)`,
                    [artistName, `${artistName}@gmail.com`, 'hashed_password', 'Unknown', 'Music'], // Adjust fields as needed
                    (err) => {
                        if (err) {
                            console.error("Error inserting artist:", err.message);
                        }
                    }
                );

                // Insert album if not already in Album table
                db.run(
                    `INSERT OR IGNORE INTO Album (album_id, album_title, authentication_id) VALUES (?, ?, ?)`,
                    [albumId, albumTitle, albumId],
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

            console.log(`${results.length} items fetched for "${term}" and saved to the database.`);
        } catch (error) {
            console.error(`Error fetching data for ${term}:`, error.message);
        }
    }

    console.log("Data fetching and saving completed for all terms.");
};

module.exports = { fetchAndSaveItunesData };
