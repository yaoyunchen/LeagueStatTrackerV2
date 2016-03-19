var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

// SUMMONER
// --------
// Summoner factory, gets all data related to summoners for the app.
LeagueStatTrackerApp.factory('$summoner', ['$http', '$q', function($http, $q) {
  "use strict";
  return {
    // Gets summoner level, icon, and id from the name.
    get: function(summonerName, region, callback) {
      // var path = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/"+ summonerName + "?api_key=" + key;
      
      var deferred = $q.defer();
      var summoner = {};

      var urlBase = '/search';
      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerName + '?callback=' + callbackName;

      // Gets the data from the LoL API through the back end.
      // Should look for error 404 errors when the summoner is not found
      $http.get(url)
      .then(function(res) {
        var key = summonerName;
        for (key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            deferred.resolve(summoner[key] = res.data[key]);
          }
        }
        if (callback) {
          callback();
        }
      })

      // $http.get(path)
      // .then(function(res) {
      //   return angular.fromJson(res.data);
      // })
      // .then(function(res) {
      //   var key;
      //   for (key in res) {
      //     if (res.hasOwnProperty(key)) {
      //       deferred.resolve(summoner[key] = res[key]);
      //     }
      //   }
      //   if (callback) {
      //     callback();
      //   }
      // });

      return deferred.promise.$$state;
    },

    // Gets summoner stats for a given summoner ID.
    getStats: function(summonerID, region, callback) {
      var stats = [];
      var urlBase = '/search/stats';

      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerID + '?callback=' + callbackName;

      $http.get(url)
      .then(function(res) {
        var responses = res.data.playerStatSummaries
        for (var i=0; i < responses.length; i++) {
          stats[i] = responses[i]
        }
        if (callback) {
          callback();
        }
      });

      return stats;
    },

    // Gets summoner's ranked stats.
    getRank: function(summonerID, region) {
      var rank = [];
      var urlBase = '/search/rank';

      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerID + '?callback=' + callbackName;
 
      $http.get(url)
      .then(function(res) {
        var key = summonerID;
        for (key in res.data) {
          if (res.data.hasOwnProperty(key)) {
            rank[key] = res.data[key][0];
          }
        }
      });

      return rank;
    },

    // Gets summoner's recent match history.
    getRecent: function(summonerID, region, callback) {
      var recent = [];

      var urlBase = '/search/recent';
      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerID + '?callback=' + callbackName;
      
      $http.get(url)
      .then(function(res) {
        var responses = res.data.games
        for (var i=0; i < responses.length; i++) {
          recent[i] = responses[i];
        }
        if (callback) {
          callback();
        }
      });

      return recent;
    },

    // Gets the champion for a summoner, used for match history.
    getChamp: function(champID, region) {
      var deferred = $q.defer();
      var champ = [];

      var urlBase = '/search/champ';
      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + champID + '?callback=' + callbackName;
      
      $http.get(url)
      .then(function(res) {
        deferred.resolve(champ = res.data);
      });
      
      return deferred.promise.$$state;
    },

    // Gets summoner's rune pages.
    getRunes: function(summonerID, region) {
      var runes = [];

      var urlBase = '/search/runes';
      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerID + '?callback=' + callbackName;

      $http.get(url)
      .then(function(res) {
        var responses = res.data[summonerID].pages;
        for (var i=0; i < responses.length; i++) {
          runes[i] = responses[i];
        }
      });

      return runes;
    },

    // Gets summoner's masteries pages.
    getMasteries: function(summonerID, region) {
      var masteries = [];

      var urlBase = '/search/masteries';
      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerID + '?callback=' + callbackName;

      $http.get(url)
      .then(function(res) {
        var responses = res.data[summonerID].pages;
        for (var i=0; i < responses.length; i++) {
          masteries[i] = responses[i];
        }
      });

      return masteries;
    }
  }
}]);

// CHAMPIONS
// ---------
// Gets champion information from the LoL API.
LeagueStatTrackerApp.factory('$champions', ['$http', '$q', function($http, $q) {
  "use strict";
  return {
    // Gets the current free to play champions.
    getFree: function(imgCallback) {
      var deferred = $q.defer();
      var champs = [];

      var urlBase = '/search/freechamps';
      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '?callback=' + callbackName;

      $http.get(url)
      .then(function(res) {
        deferred.resolve(champs = res.data.champions);
        if (imgCallback) {
          imgCallback();
        }
      });

      return deferred.promise.$$state;
    },

    // Gets champion images for a given championID.
    getChampImages: function(champID) {
      
      var deferred = $q.defer();
      var imageID = [];
      var region = 'na';
      champID = 0;
      var urlBase = '/search/champ';
      var callbackName = 'JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + champID + '?callback=' + callbackName;
      $http.get(url)
      .then(function(res) {
        if (res.data.status.status_code == 200) {
          deferred.resolve(imageID = res.data.key);
        } else if (res.data.status.status_code == 404) {
          
        }
      });

      return deferred.promise.$$state;
    }
  }
}]);