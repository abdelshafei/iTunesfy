const express = require('express');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const itunesRoute = require('./routes/itunesRoute');
const albumRoutes = require('./routes/albumRoutes');
const db = require('./config/db');

const { fetchAndSaveItunesData } = require('./controllers/itunesFetchController');

// Run the fetch and save function
fetchAndSaveItunesData().then(() => {
    console.log("Database update complete.");
    process.exit(0); // Exit the process after updating
}).catch((error) => {
    console.error("Error updating database:", error);
    process.exit(1);
});

const app = express();
app.use(express.json());

// Use routes
app.use('/api/itunes', itunesRoute); // Public route for fetching iTunes data
app.use('/api/auth', authRoutes); // Public route for authentication
app.use('/api/playlists', playlistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/songs', songsRoute)
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});