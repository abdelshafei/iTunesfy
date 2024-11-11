const express = require('express');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');

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