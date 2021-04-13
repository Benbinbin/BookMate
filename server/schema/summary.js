const mongoose = require('../db/mongoose');

const summarySchema = new mongoose.Schema({
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

});

module.exports = summarySchema;