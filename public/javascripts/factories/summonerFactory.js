var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

// Summoner factory, gets all data related to summoners for the app.
LeagueStatTrackerApp.factory('$summoner', ['$http', '$q', function($http, $q) {
  "use strict";
  return {
    // Gets summoner level, icon, and id from the name.
    get: function(summonerName, region, callback) {
      var deferred = $q.defer();
      var summoner = {};
      
      var urlBase = '/search';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerName + jsonCallback;

      // Gets the data from the LoL API through the back end.
      $http.get(url)
      .then(function(res) {
        if (res.status == 200) {
          var key = summonerName;
          for (key in res.data) {
            // Check if a 404 is returned.
            if (res.data.hasOwnProperty('status') == true) {
              if (res.data.status.hasOwnProperty('status_code')) {
                if (res.data.status.status_code == 404) {
                  break;
                }
              }
            }
            if (res.data.hasOwnProperty(key)) {
              deferred.resolve(summoner[key] = res.data[key]);
            }    
            if (callback) {
              callback();
            }
          }
        }
      });

      return deferred.promise.$$state;
    },

    // Gets summoner stats for a given summoner ID.
    getStats: function(summonerID, region, callback) {
      var stats = [];
      
      var urlBase = '/search/stats';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerID + jsonCallback;

      $http.get(url)
      .then(function(res) {
        if (res.status == 200) {
          var responses = res.data.playerStatSummaries
          for (var i=0; i < responses.length; i++) {
            stats[i] = responses[i]
          }
          if (callback) {
            callback();
          }
        }
      });
        
      return stats;
    },

    // Gets summoner's ranked stats.
    getRank: function(summonerID, region) {
      var rank = [];

      var urlBase = '/search/rank';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerID + jsonCallback;
 
      $http.get(url)
      .then(function(res) {
        // Data is returned from the LoL API even if it does not exist.  Check if the body contains a status
        if (res.status == 200) {
          var key = summonerID;
          for (key in res.data) {
            // Check if a 404 is returned.
            if (res.data.hasOwnProperty('status') == true) {
              if (res.data.status.hasOwnProperty('status_code')) {
                if (res.data.status.status_code == 404) {
                  break;
                }
              }
            }
            if (res.data.hasOwnProperty(key)) {
              rank[key] = res.data[key][0];
            }
          }  
        }
      });

      return rank;
    },

    // Gets summoner's recent match history.
    getRecent: function(summonerID, region, callback) {
      var recent = [];

      var urlBase = '/search/recent';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + summonerID + jsonCallback;
      
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
    }
  };
}]);