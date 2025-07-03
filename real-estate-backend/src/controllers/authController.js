import db from '../config/db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'Dnyanesh@7118';

export const register = (req, res) => {
  const { name, email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (results.length > 0) {
      console.log("==============", results);
      return res.status(400).json({ message: 'User exists' });
    }
    db.query('INSERT INTO users SET ?', { name, email, password }, (err) => {
      if (err) throw err;
      res.status(201).json({ message: 'User registered' });
    });
  });
};


export const login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name // assuming user has a name column
      },
      JWT_SECRET,
      { expiresIn: '2h' } // token expires in 2 hours
    );

    res.json({ message: 'Login successful', token });
  });
};
