const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Path to the database and schema files
const dbPath = path.resolve(__dirname, '../ITunesify.db');
const schemaPath = path.resolve(__dirname, '../schema.sql');

// Initialize the SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");

        // Load schema.sql and execute it if tables don't exist
        const schema = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schema, (err) => {
            if (err) {
                console.error("Error creating tables:", err.message);
            } else {
                console.log("Database initialized with schema.");
            }
        });
    }
});

module.exports = db;