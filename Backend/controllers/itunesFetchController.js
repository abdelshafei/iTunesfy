const axios = require('axios');
const db = require('../config/db');
const searchTerms = require('../config/iTunesTerms'); // Import hard-wired search terms

// Function to fetch and save data for predefined search terms
const fetchAndSaveItunesData = async () => {
    let albumIdCounter = 0;
    let songIdCounter = 0;
    for (const [artistName, { id: authId, genre: style }]  of Object.entries(searchTerms)) {
        console.log(`Fetching albums for: ${artistName} with authentication ID: ${authId} specalizing in style: ${style}`);

        try {
            // Fetch albums for the artist
            const albumResponse = await axios.get(`https://itunes.apple.com/search`, {
                params: {
                    term: artistName,
                    media: 'music',
                    entity: 'album',
                    limit: 10 // Limit the number of albums
                }
            });

            const albums = albumResponse.data.results;

            if (albums.length === 0) {
                console.log(`No albums found for ${artistName}.`);
                continue;
            }

            for (const album of albums) {
                albumIdCounter++;
                const albumTitle = album.collectionName;
                const albumId = album.collectionId;

                // Insert artist if not already in Artists table
                db.run(
                    `INSERT OR IGNORE INTO Artists (userName, authentication_id, email, password, country, style) VALUES (?, ?, ?, ?, ?, ?)`,
                    [artistName, authId, `${artistName}@gmail.com`, "hashed_password", 'USA', style], // Adjust fields as needed
                    (err) => {
                        if (err) {
                            console.error("Error inserting artist:", err.message);
                        }

                        if(this.change === 0) console.error("artists table not changing")
                    }
                );

                // Insert album into the database
                db.run(
                    `INSERT OR IGNORE INTO Album (album_id, album_title, authentication_id) VALUES (?, ?, ?)`,
                    [albumIdCounter, albumTitle, authId],
                    (err) => {
                        if (err) {
                            console.error("Error inserting album:", err.message);
                        }
                    }
                );

                console.log(`Inserted album: ${albumTitle} (ID: ${albumIdCounter})`);

                // Fetch songs for this album
                console.log(`Fetching songs for album: ${albumTitle}`);
                const songResponse = await axios.get(`https://itunes.apple.com/lookup`, {
                    params: {
                        id: albumId,
                        entity: 'song' // Fetch songs in the album
                    }
                });

                const songs = songResponse.data.results.filter((item) => item.wrapperType === 'track');

                for (const song of songs) {
                    songIdCounter++;
                    const songTitle = song.trackName;
                    const duration = song.trackTimeMillis;

                    // Insert song into the database
                    db.run(
                        `INSERT OR IGNORE INTO Song (song_id, song_title, duration, album_id) VALUES (?, ?, ?, ?)`,
                        [songIdCounter, songTitle, duration, albumIdCounter],
                        (err) => {
                            if (err) {
                                console.error("Error inserting song:", err.message);
                            }
                        }
                    );
                }

                console.log(`Inserted ${songs.length} songs for album: ${albumTitle}`);
            }
        } catch (error) {
            console.error(`Error fetching data for ${artistName}:`, error.message);
        }
    }

    console.log("Data fetching and saving completed for all terms.");
};

module.exports = { fetchAndSaveItunesData };

