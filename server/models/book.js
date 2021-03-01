const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  metadata: {
    isbn: Number,
    titles: {
      type: Array,
      required: true
    },
    date: Date,
    authors: Array,
    translators: Array,
    press: String,
    covers: Array,
    pagination: Number,
    description: String,
    review: String,
    tags: Array,
    stars: Number,
    sources: Array,
    links: Array,
    createdDate: {
      type: Date,
      default: Date.now
    },
    catalog: Object
  },
  quotes: [{
    body: Object,
    comment: Object
  }],
  summaries: [{
    content: Object
  }],
});

module.exports = mongoose.model('Book', bookSchema);