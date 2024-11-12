const express = require('express');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const itunesRoute = require('./routes/itunesRoute');
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
app.use('/auth', authRoutes);
app.use('/playlists', playlistRoutes);
app.use('/songs', songRoutes);
app.use('/albums', albumRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});