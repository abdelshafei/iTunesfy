const express = require('express');
const itunesController = require('../controllers/itunesController'); // Import the controller
const router = express.Router();

// Define a route to fetch iTunes data and save it to the database
router.get('/fetch-itunes-data', itunesController.fetchAndSaveItunesData);

module.exports = router;