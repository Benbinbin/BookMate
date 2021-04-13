const mongoose = require('../db/mongoose');

const quoteSchema = new mongoose.Schema({

    chapter: String,
    type: {
      type: String,
      default: 'annotation'
    },
    location: Number,
    contentOrigin: {
      type: String,
      default: ''
    },
    content: Object,
    commentOrigin: {
      type: String,
      default: ''
    },
    comment: Object,
    createdDate: {
      type: Date,
      default: Date.now
    },
    updatedDate: {
      type: Date,
      default: Date.now
    }
});

module.exports = quoteSchema;