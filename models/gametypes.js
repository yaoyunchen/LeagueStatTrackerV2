var mongoose = require('mongoose');

var GameTypeSchema = new mongoose.Schema({
  type: String,
  name: String,
  code: String
});

// Registers the model with global mongoose object so it can be used to interact with database anywhere else mongoose is imported.
module.exports = mongoose.model('GameTypes', GameTypeSchema);