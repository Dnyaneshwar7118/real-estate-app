const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body, user: req.user });
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
