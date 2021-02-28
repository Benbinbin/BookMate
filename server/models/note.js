const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  links: {
    type: Array,
  },
  content: {
    type: Object,
    required: true
  },
  createdDate: {
    type: Date,
  }
});

module.exports = mongoose.model('Note', noteSchema)