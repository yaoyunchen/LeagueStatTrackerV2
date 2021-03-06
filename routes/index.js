var express       = require('express');
var request       = require('request');
var mongoose      = require('mongoose');

var app           = require('../app.js');
if (process.env.NODE_ENV != 'production') {
  var env         = require('../env.js');
}

var router = express.Router();

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Should be in database or process.env.
const API_KEY = process.env.LOL_API_KEY;

// MONGODB ROUTES
// --------------
var Regions     = require('../models/regions');
var GameTypes   = require('../models/gametypes');
var Champions   = require('../models/champions');

router.get('/regions', function(req, res) {
  var query = Regions.find({});
    
  query.exec(function(err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.send(err);
    }
  });
});

router.get('/gametypes', function(req, res) {
  var query = GameTypes.find({});

  query.exec(function(err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.send(err);
    }
  });
});

router.get('/champs/:champID', function(req, res) {
  var query = Champions.find({"id" : req.params.champID});
  
  query.exec(function(err, docs) {
    if (!err) {
      res.json(docs);
    } else {
      res.send(err);
    }
  });
});


// LEAGUE API ROUTES
// -----------------
// Gets the summoner information from the LoL API and returns it to the summoner factory.
router.get('/search/:region/:summonerName', function(req, res) {
  var path = "https://" + req.params.region + ".api.pvp.net/api/lol/" + req.params.region + "/v1.4/summoner/by-name/"+ req.params.summonerName + "?api_key=" + API_KEY;
  
  request.get(path, function(err, response) {
    // Only return data if it's a success.
    if (!err) {
      res.json(JSON.parse(response.body));
    } else {
      console.error(err);
    }
  });
});

// Gets the stat of a summoner.
router.get('/search/stats/:region/:summonerID', function(req, res) {
  var path = "https://" + req.params.region + ".api.pvp.net/api/lol/" + req.params.region + "/v1.3/stats/by-summoner/" + req.params.summonerID +"/summary?api_key=" + API_KEY;
  
  request.get(path, function(err, response) {
    if (!err) {
      res.json(JSON.parse(response.body));
    } else {
      console.error(err);
    }
  });
});

// Gets the ranked information of a summoner.
router.get('/search/rank/:region/:summonerID', function(req, res) {
  var path = "https://" + req.params.region + ".api.pvp.net/api/lol/" + req.params.region + "/v2.5/league/by-summoner/" + req.params.summonerID + "/entry?api_key=" + API_KEY;
  
  request.get(path, function(err, response) {
    if (!err) {
      res.json(JSON.parse(response.body));
    } else {
      console.error(err);
    }
  });
});

// Ges the recent matches of a summoner.
router.get('/search/recent/:region/:summonerID', function(req, res) {
  var path = "https://" + req.params.region + ".api.pvp.net/api/lol/" + req.params.region + "/v1.3/game/by-summoner/" + req.params.summonerID +"/recent?api_key=" + API_KEY;
  
  request.get(path, function(err, response) {
    if (!err && response.statusCode === 200) {
      res.json(JSON.parse(response.body));
    } else {
      console.error(err);
    }
  });
});

// Get current free to play champions.
router.get('/search/freechamps', function(req, res) {
  var path = "https://na.api.pvp.net/api/lol/na/v1.2/champion?freeToPlay=true&api_key=" + API_KEY;
  request.get(path, function(err, response) {
    if (!err && response.statusCode === 200) {
      res.json(JSON.parse(response.body));
    } else {
      console.error(err);
    }
  });
});

module.exports = router;
