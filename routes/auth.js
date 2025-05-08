const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  try {
    db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, password);
    res.status(200).json({ message: 'User registered successfully' });
} 
  catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return res.status(404).json({ error: 'Email not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  return res.status(200).json({
    message: 'Login successful',
    email: user.email
  });
});

module.exports = router;
