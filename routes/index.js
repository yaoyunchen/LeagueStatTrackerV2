var express = require('express');
var request = require('request');
//var env = require('../env.js');
var router = express.Router();

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Should be in database or process.env.
const API_KEY = process.env.LOL_API_KEY;
//const API_KEY = "8a959856-61b1-4248-8746-ee2e0c36f64f";

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

// // Get rune pages of a summoner.
// router.get('/search/runes/:region/:summonerID', function(req, res) {
//   var path = "https://" + req.params.region + ".api.pvp.net/api/lol/" + req.params.region + "/v1.4/summoner/" + req.params.summonerID + "/runes?api_key=" + API_KEY;

//   request.get(path, function(err, response) {
//     if (!err && response.statusCode === 200) {
//       res.json(JSON.parse(response.body));
//     } else {
//       console.error(err);
//     }
//   });
// });

// // Get masteries pages of a summoner.
// router.get('/search/masteries/:region/:summonerID', function(req, res) {
//   var path = "https://" + req.params.region + ".api.pvp.net/api/lol/" + req.params.region + "/v1.4/summoner/" + req.params.summonerID+ "/masteries?api_key=" + API_KEY;

//   request.get(path, function(err, response) {
//     if (!err && response.statusCode === 200) {
//       res.json(JSON.parse(response.body));
//     } else {
//       console.error(err);
//     }
//   });
// });


// Get champion data from a champion ID.
router.get('/search/champ/:region/:champID', function(req, res) {
  
  var path = "https://" + req.params.region + ".api.pvp.net/api/lol/static-data/" + req.params.region + "/v1.2/champion/" + req.params.champID + "?champData=image&api_key=" + API_KEY;
  request.get(path, function(err, response) {
    if (!err) {
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
