const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { methodLogger } = require("../utils/logger");


// Register a new user (listener or artist)
exports.register = async (req, res) => {
  const { userName, email, password, country, userType } = req.body;

  // Insert user into appropriate table based on userType
  if (userType === 'artist') {

    const { style, authentication_id } = req.body;

    // Step 1: Validate the authentication_id from the `auth_ids` table
    db.get(
      `SELECT * FROM auth_ids WHERE Auth_id = ?`,
      [authentication_id],
      (err, validAuthId) => {
        if (err) {
          console.log("Database error: ", err )
          res.status(500).json({ message: 'Error validating authentication ID' });
          methodLogger(req, res);
          return;
        }

        // If the authentication_id is not found in `auth_ids`, it's invalid
        if (!validAuthId) {
          res.status(400).json({ message: 'Authentication ID is invalid. Please use a valid ID.' });
          methodLogger(req, res);
          return;
        }

        // Step 2: Check if the authentication_id is already in use by another artist
        db.get(
          `SELECT * FROM Artists WHERE authentication_id = ?`,
          [authentication_id],
          (err, usedAuthId) => {
            if (err) {
              res.status(500).json({ message: 'Error checking authentication ID usage' });
              methodLogger(req, res);
              return;
            }

            // If the authentication_id is already in use, return an error
            if (usedAuthId) {
              res.status(400).json({ message: 'Authentication ID is already in use by another artist.' });
              methodLogger(req, res);
              return;
            }

            // Step 3: Register the artist if all checks pass
            db.run(
              `INSERT OR IGNORE INTO Artists (userName, authentication_id, email, password, country, style) 
              VALUES (?, ?, ?, ?, ?, ?)`,
              [userName, authentication_id, email, password, country, style],
              function (err) {
                if (err){
                  res.status(500).json({ message: 'Error registering artist in the database' });
                  methodLogger(req, res);
                  return;
                }

                res.status(201).json({ message: 'Artist registered successfully' });
                methodLogger(req, res);
                return;
              }
            );
          }
        );
      }
    );
  } else {
  // Default to listener registration

    console.log(req.body);
    db.run(
      `INSERT OR IGNORE INTO Listeners (userName, email, password, country) VALUES (?, ?, ?, ?)`,
      [userName, email, password, country],
      function (err) {
        if (err) {
          res.status(500).json({ message: "Error registering listener." });
          methodLogger(req, res);
          return;
        }

        if (this.change == 0) {
          res.status(400).json({ message: "User Name already in use!" });
          methodLogger(req, res);
          return;
        }
        

        // Retrieve the inserted user's ID to insert a default playlist
        db.get(
          `SELECT user_id FROM Listeners WHERE userName = ?`,
          [userName],
          (err, row) => {
            if (err) {
              res.status(500).json({ message: "Error retrieving user ID." });
              methodLogger(req, res);
              return;
            }

            const userId = row.user_id;

            // Insert default playlist for the user
            db.run(
              `INSERT OR IGNORE INTO Playlist (user_id, playlist_name, play_counter) VALUES (?, ?, ?)`,
              [userId, "Liked Songs", 0],
              function (err) {
                if (err) {
                  console.log("Database Error: ", err)
                  res.status(500).json({ message: "Error creating default playlist." });
                  methodLogger(req, res);
                  return;
                }

                res.status(201).json({ message: "Listener registered successfully" });
                methodLogger(req, res);
                return;
              }
            );
          }
        );
      }
    );
  }
};

// User login (for both listeners and artists)
exports.login = (req, res) => {
  const { username, password, userType, authentication_id} = req.body;

  const tableName = userType === 'artist' ? 'Artists' : 'Listeners';
  if(userType === 'listener') {
      db.get(`SELECT * FROM ${tableName} WHERE userName = ?`, [username], async (err, user) => {
          if (err || !user) {
            res.status(400).json({ message: 'user not found' });
            methodLogger(req, res);
            return;
          }
          // Verify password
          const validPassword = password === user.password
          if (!validPassword) {
            res.status(400).json({ message: 'invalid password' });
            methodLogger(req, res);
            return;
          }

          // Generate JWT token
          const token = jwt.sign(
              { user_id: user.user_id || user.authentication_id, userType: userType },
              "secret",
              { expiresIn: '9h' }
          );

          const userId = user.user_id

          res.json({ userId, token, message: 'Login successful' });
          methodLogger(req, res);
          return;
      });
  } else {
    db.get(`SELECT * FROM ${tableName} WHERE userName = ?`, [username], async (err, user) => {
      if (err || !user) {
        res.status(400).json({ message: 'Artist not found' });
        methodLogger(req, res);
        return;
      }

      // Verify password & authentication id
      const validPassword = password === user.password;
      const validAuthId = authentication_id === user.authentication_id;
      if(!validPassword || !validAuthId) {
        res.status(400).json({ message: 'Invalid password' });
        methodLogger(req, res);
        return;
      }
      

      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.user_id || user.authentication_id, userType: userType },
        "secret",
        { expiresIn: '9h' }
      );
      res.status(200).json({ token, message: 'Login successful' });
      methodLogger(req, res);
      return;
    });
  }

};