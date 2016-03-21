var mongoose = require('mongoose');

var championSchema = new mongoose.Schema({
  key: String,
  name: String
});

module.exports = mongoose.model('champions', championSchema);