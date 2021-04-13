const mongoose = require('../db/mongoose');
const quoteSchema = require('../schema/quote');
const summarySchema = require('../schema/summary');

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
    // pagination: Number,
    defaultCollections: Array,
    collections: Array,
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
    category: Object
  },
  quotes: [quoteSchema],
  summaries: [summarySchema],
});

module.exports = mongoose.model('Book', bookSchema);