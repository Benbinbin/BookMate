const mongoose = require('../db/mongoose');

const bookSchema = new mongoose.Schema({
  metadata: {
    isbn: Number,
    titles: {
      type: [String],
      required: true
    },
    date: Date,
    authors: [String],
    translators: [String],
    press: String,
    covers: [String],
    // pagination: Number,
    default_collections: Array,
    collections: [String],
    description: String,
    review: String,
    tags: [String],
    stars: {
      type: Number,
      default: 0
    },
    sources: Array,
    links: [String],
    created_date: {
      type: Date,
      default: Date.now
    },
    category: Object
  },
  quote_ids: {
    type: [String],
    default: []
  },
  summary_ids: {
    type: [String],
    default: []
  },
});

module.exports = mongoose.model('Book', bookSchema);