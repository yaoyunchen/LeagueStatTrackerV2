var mongoose = require('mongoose');

var GametypeSchema = new mongoose.Schema({
  type: String,
  name: String,
  code: String
});

// Registers the model with global mongoose object so it can be used to interact with database anywhere else mongoose is imported.
mongoose.model('GameTypes', GametypeSchema);