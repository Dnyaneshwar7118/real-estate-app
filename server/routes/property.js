const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET /api/properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error('Error in /api/properties:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
