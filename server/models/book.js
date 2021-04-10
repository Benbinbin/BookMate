const mongoose = require('../db/mongoose');

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
  quotes: [{
    chapter: String,
    type: {
      type: String,
      default: 'annotation'
    },
    location: Number,
    contentOrigin: String,
    content: Object,
    commentOrigin: String,
    comment: Object,
    createdDate: {
      type: Date,
      default: Date.now
    },
    updatedDate: {
      type: Date,
      default: Date.now
    }
  }],
  summaries: [{
    chapter: String,
    content: Object,
    createdDate: {
      type: Date,
      default: Date.now
    },
    updatedDate: {
      type: Date,
      default: Date.now
    }
  }],
});

module.exports = mongoose.model('Book', bookSchema);