import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log("Received GET request to /api/properties");
  db.query('SELECT * FROM properties', (err, results) => {
    if (err) {
      console.error("Error in /api/properties:", err.message);
      return res.status(500).send('Server Error');
    }
    res.json(results);
  });
});

export default router;

