const mongoose = require('../db/mongoose');

const noteSchema = new mongoose.Schema({
  links: Array,
  content: {
    type: Object,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteSchema);