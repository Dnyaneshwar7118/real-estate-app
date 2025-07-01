const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: String,
  city: String,
  type: String,
  rent: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Property', PropertySchema);
