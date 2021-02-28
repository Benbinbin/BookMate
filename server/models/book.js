const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
  },
  titles: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
  },
  authors: {
    type: Array,
  },
  translators: {
    type: Array,
  },
  covers: {
    type: Array,
  },
  description: {
    type: String,
  },
  review: {
    type: String,
  },
  tags: {
    type: Array,
  },
  stars: {
    type: Number,
  },
  sources: {
    type: Array,
  },
  links: {
    type: Array,
  },
  createdDate: {
    type: Date,
  },
  quotes: {
    type: Array,
  },
  summaries: {
    type: Array
  }
});

module.exports = mongoose.model('Book', bookSchema)