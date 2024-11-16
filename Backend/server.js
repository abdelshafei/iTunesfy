const express = require('express');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const itunesRoute = require('./routes/itunesRoute');
const albumRoutes = require('./routes/albumRoutes');
const searchRoutes = require('./routes/searchRoutes');
const db = require('./config/db');

const { fetchAndSaveItunesData } = require('./controllers/itunesFetchController');

// Run the fetch and save function
fetchAndSaveItunesData().then(() => {
    console.log("Database update complete.");
}).catch((error) => {
    console.error("Error updating database:", error);
});

setInterval(() => {
    fetchAndSaveItunesData()
    .then(() => {
    console.log("Periodic database update complete.");
    })
    .catch((error) => {
    console.error("Error during periodic database update:", error.message || error);
    });
}, 60 * 60 * 1000);

const app = express();
app.use(express.json());

// Use routes
app.use('/api/itunes', itunesRoute); // Public route for fetching iTunes data
app.use('/api/auth', authRoutes); // Public route for authentication
app.use('/api/playlists', playlistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/search', searchRoutes)
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});