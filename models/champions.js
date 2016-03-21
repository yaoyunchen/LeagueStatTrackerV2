var mongoose = require('mongoose');

var ChampionSchema = new mongoose.Schema({
  key: String,
  name: String
});

module.exports = mongoose.model('Champions', ChampionSchema);