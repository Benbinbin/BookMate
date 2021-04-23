const mongoose = require('../db/mongoose');

const summarySchema = new mongoose.Schema({
  chapter: String,
  content: Object,
  quote_links: [String],
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Summary', summarySchema);