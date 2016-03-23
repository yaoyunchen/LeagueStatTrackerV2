var mongoose = require('mongoose');

var ChampionSchema = new mongoose.Schema({
  id: String,
  key: String,
  name: String,
  title: String
});

module.exports = mongoose.model('Champions', ChampionSchema);