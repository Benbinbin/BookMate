const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  links: Array,
  content: {
    type: Object,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteSchema);