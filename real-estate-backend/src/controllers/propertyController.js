import db from '../config/db.js';

export const addProperty = (req, res) => {
  try {
    const { title, city, rent, type, description } = req.body;

    // Get image URL if file was uploaded
    let imageUrl = null;
    if (req.file) {
      // Create URL path for the uploaded image
      imageUrl = `/assets/images/${req.file.filename}`;
    }

    // Prepare property object
    const property = {
      title,
      city,
      rent: parseInt(rent),
      type,
      description,
      imageUrl
    };

    db.query('INSERT INTO properties SET ?', property, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error', error: err.message });
      }
      res.status(201).json({
        message: 'Property added successfully',
        propertyId: result.insertId,
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProperties = (req, res) => {
  db.query('SELECT * FROM properties', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    res.json(results);
  });
};