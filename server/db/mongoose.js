const mongoose = require('mongoose');

// link to local database
mongoose.connect('mongodb://localhost/bookmate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;