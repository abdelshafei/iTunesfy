const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const itunesRoute = require('./routes/itunesRoute');
const albumRoutes = require('./routes/albumRoutes');
const searchRoutes = require('./routes/searchRoutes');
const db = require('./config/db');

const { fetchAndSaveItunesData } = require('./controllers/itunesFetchController');

fetchAndSaveItunesData().then(() => {
    console.log("Database update complete.");
}).catch((error) => {
    console.error("Error updating database:", error);
});


const app = express();

console.log("creating server app")

app.use(cors({
    origin: 'http://localhost:4200', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
}));
console.log("setting up CORS")

app.use(express.json());

// Use routes
console.log("attaching routes")
app.use('/api/itunes', itunesRoute); // Public route for fetching iTunes data
app.use('/api/auth', authRoutes); // Public route for authentication
app.use('/api/playlists', playlistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/search', searchRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});