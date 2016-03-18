var mongoose = require('mongoose');

var RegionSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

// Registers the model with global mongoose object so it can be used to interact with database anywhere else mongoose is imported.
mongoose.model('Regions', RegionSchema);