const jwt = require('jsonwebtoken');
const db = require('../config/db');


// Register a new user (listener or artist)
exports.register = async (req, res) => {
  const { userName, email, password, country, userType } = req.body;

  // Insert user into appropriate table based on userType
  if (userType === 'artist') {
    const { style, authentication_id } = req.body;

    // Step 1: Validate the authentication_id from the `auth_ids` table
    db.get(
      `SELECT * FROM auth_ids WHERE authentication_id = ?`,
      [authentication_id],
      (err, validAuthId) => {
        if (err) return res.status(500).json({ message: 'Error validating authentication ID' });

        // If the authentication_id is not found in `auth_ids`, it's invalid
        if (!validAuthId)
          return res
            .status(400)
            .json({ message: 'Authentication ID is invalid. Please use a valid ID.' });

        // Step 2: Check if the authentication_id is already in use by another artist
        db.get(
          `SELECT * FROM Artists WHERE authentication_id = ?`,
          [authentication_id],
          (err, usedAuthId) => {
            if (err)
              return res.status(500).json({ message: 'Error checking authentication ID usage' });

            // If the authentication_id is already in use, return an error
            if (usedAuthId)
              return res
                .status(400)
                .json({ message: 'Authentication ID is already in use by another artist.' });

            // Step 3: Register the artist if all checks pass
            db.run(
              `INSERT OR IGNORE INTO Artists (userName, authentication_id, email, password, country, style) 
              VALUES (?, ?, ?, ?, ?, ?)`,
              [userName, authentication_id, email, password, country, style],
              function (err) {
                if (err)
                  return res
                    .status(500)
                    .json({ message: 'Error registering artist in the database' });
                res.status(201).json({ message: 'Artist registered successfully' });
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
          return res.status(500).json({ message: "Error registering listener." });
        }

        if (this.changes === 0) {
          return res.status(400).json({ message: "User Name already in use!" });
        }

        // Retrieve the inserted user's ID to insert a default playlist
        db.get(
          `SELECT user_id FROM Listeners WHERE userName = ?`,
          [userName],
          (err, row) => {
            if (err) {
              return res.status(500).json({ message: "Error retrieving user ID." });
            }

            const userId = row.user_id;

            // Insert default playlist for the user
            db.run(
              `INSERT OR IGNORE INTO Playlist (user_id, playlist_name, like_counter, play_counter) VALUES (?, ?, ?, ?)`,
              [userId, "Liked Songs", 0, 0],
              function (err) {
                if (err) {
                  return res.status(500).json({ message: "Error creating default playlist." });
                }

                return res
                  .status(201)
                  .json({ message: "Listener registered successfully" });
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

    console.log(req.body)

    const tableName = userType === 'artist' ? 'Artists' : 'Listeners';
    if(userType === 'listener') {
        db.get(`SELECT * FROM ${tableName} WHERE userName = ?`, [username], async (err, user) => {
            if (err || !user) return res.status(400).json({ message: 'Invalid credentials1' });
            // Verify password
            const validPassword = password === user.password
            if (!validPassword) return res.status(400).json({ message: 'Invalid credentials2' });

            // Generate JWT token
            const token = jwt.sign(
                { user_id: user.user_id || user.authentication_id, userType: userType },
                "secret",
                { expiresIn: '9h' }
            );

            res.json({ token, message: 'Login successful' });
        });
    } else {
        db.get(`SELECT * FROM ${tableName} WHERE userName = ?`, [username], async (err, user) => {
            if (err || !user) {
              console.log("invalid username...");
              return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Verify password & authentication id
            const validPassword = password === user.password;
            const validAuthId = authentication_id === user.authentication_id;
            if(!validPassword || !validAuthId) {
              if(!validPassword) {
                console.log("incorrect pasword")
              } else if(!validAuthId) {
                console.log("invalid auth id")
              }
              return res.status(400).json({ message: 'Invalid credentials' });
            }
            

            // Generate JWT token
            const token = jwt.sign(
                { user_id: user.user_id || user.authentication_id, userType: userType },
                "secret",
                { expiresIn: '9h' }
            );
            console.log("login successful")
            res.status(200).json({ token, message: 'Login successful' });
        });
    }
};