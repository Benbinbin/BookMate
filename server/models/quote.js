const mongoose = require('../db/mongoose');

const quoteSchema = new mongoose.Schema({
  book: String,
  chapter: String,
  type: {
    type: String,
    default: 'annotation'
  },
  location: Number,
  content_origin: {
    type: String,
    default: ''
  },
  content: Object,
  comment_origin: {
    type: String,
    default: ''
  },
  comment: Object,
  summary_links: [String],
  note_links: [String],
  tags: [String],
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quote', quoteSchema);