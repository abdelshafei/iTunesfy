const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { listeners } = require('process');

// Register a new user (listener or artist)
exports.register = async (req, res) => {
    const { userName, email, password, country, userType } = req.body;

    try {
        // Check if user already exists
        const tableName = userType === 'artist' ? 'Artists' : 'Listeners';
        db.get(`SELECT * FROM ${tableName} WHERE email = ?`, [email], async (err, user) => {
            if (user) return res.status(400).json({ message: 'User already exists' });

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into appropriate table based on userType
            if (userType === 'artist') {
                const { style, authentication_id} = req.body; // Additional field for artists
                db.run(
                    `INSERT OR IGNORE INTO Artists (userName, authentication_id, email, password, country, style) VALUES (?, NULL, ?, ?, ?, ?)`,
                    [userName, authentication_id, email, hashedPassword, country, style],
                    function (err) {
                        if (err) return res.status(500).json({ message: 'Error registering artist' });
                        res.status(201).json({ message: 'Artist registered successfully' });
                    }
                );
            } else {
                // Default to listener registration
                db.run(
                    `INSERT OR IGNORE INTO Listeners (userName, email, password, country) VALUES (?, NULL, ?, ?, ?)`,
                    [userName, email, hashedPassword, country],
                    function (err) {
                        if (err) return res.status(500).json({ message: 'Error registering listener' });
                        res.status(201).json({ message: 'Listener registered successfully' });
                    }
                );
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User login (for both listeners and artists)
exports.login = (req, res) => {
    const { username, email, password, userType } = req.body;

    const tableName = userType === 'artist' ? 'Artists' : 'Listeners';
    if(tableName === 'listeners') {
        db.get(`SELECT * FROM ${tableName} WHERE userName = ?`, [username], async (err, user) => {
            if (err || !user) return res.status(400).json({ message: 'Invalid credentials' });

            // Verify password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

            // Generate JWT token
            const token = jwt.sign(
                { user_id: user.user_id || user.authentication_id, userType: userType },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token, message: 'Login successful' });
        });
    } else {
        db.get(`SELECT * FROM ${tableName} WHERE userName = ?`, [username], async (err, user) => {
            if (err || !user) return res.status(400).json({ message: 'Invalid credentials' });

            // Verify password & authentication id
            const validPassword = await bcrypt.compare(password, user.password);
            const validAuthId = authentication_id === user.authentication_id;
            if(!validPassword || !validAuthId) return res.status(400).json({ message: 'Invalid credentials' });

            // Generate JWT token
            const token = jwt.sign(
                { user_id: user.user_id || user.authentication_id, userType: userType },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token, message: 'Login successful' });
        });
    }
};