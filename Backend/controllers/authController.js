const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Query user by email
    db.get(`SELECT * FROM Listeners WHERE email = ?`, [email], async (err, user) => {
        if (err || !user) return res.status(400).json({ message: 'Invalid credentials' });

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user.user_id, role: 'listener' }, // Payload
            process.env.JWT_SECRET,                      // Secret key
            { expiresIn: '9h' }                          // Token expiry
        );

        res.json({ token });
    });
};