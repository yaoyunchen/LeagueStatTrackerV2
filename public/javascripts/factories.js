var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

// SUMMONER
// --------
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

    // // Gets the champion for a summoner, used for match history.
    // getChamp: function(champID, callback) {
    //   var deferred = $q.defer();
    //   var champ = [];
      
    //   var urlBase = '/champs';
    //   var jsonCallback = '?callback=JSON_CALLBACK';
    //   var url = urlBase + '/' + champID + jsonCallback;
    //   $http.get(url)
    //   .then(function(res) {
    //     deferred.resolve(champ = res.data);
    //     if (callback) {
    //       callback();
    //     }
    //   });
    //   return deferred.promise.$$state;
    // }

    // // Gets summoner's rune pages.
    // getRunes: function(summonerID, region) {
    //   var runes = [];

    //   var urlBase = '/search/runes';
    //   var jsonCallback = '?callback=JSON_CALLBACK';
    //   var url = urlBase + '/' + region + '/' + summonerID + jsonCallback;

    //   $http.get(url)
    //   .then(function(res) {
    //     var responses = res.data[summonerID].pages;
    //     for (var i=0; i < responses.length; i++) {
    //       runes[i] = responses[i];
    //     }
    //   });

    //   return runes;
    // },

    // // Gets summoner's masteries pages.
    // getMasteries: function(summonerID, region) {
    //   var masteries = [];

    //   var urlBase = '/search/masteries';
    //   var jsonCallback = '?callback=JSON_CALLBACK';
    //   var url = urlBase + '/' + region + '/' + summonerID + jsonCallback;

    //   $http.get(url)
    //   .then(function(res) {
    //     var responses = res.data[summonerID].pages;
    //     for (var i=0; i < responses.length; i++) {
    //       masteries[i] = responses[i];
    //     }
    //   });

    //   return masteries;
    // }
  };
}]);

// CHAMPIONS
// ---------
// Gets champion information from the LoL API.
LeagueStatTrackerApp.factory('$champions', ['$http', '$q', function($http, $q) {
  "use strict";
  return {
    // Gets the current free to play champions.
    getFree: function(callback) {
      var deferred = $q.defer();
      var champs = [];

      var urlBase = '/search/freechamps';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + jsonCallback;

      $http.get(url)
      .then(function(res) {
        deferred.resolve(champs = res.data.champions);
        if (callback) {
          callback();
        }
      });

      return deferred.promise.$$state;
    },

    // Gets the champion for a summoner, used for match history.
    getChamp: function(champID, callback) {
      var deferred = $q.defer();
      var champ = [];
      
      var urlBase = '/champs';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + '/' + champID + jsonCallback;
      $http.get(url)
      .then(function(res) {
        deferred.resolve(champ = res.data);
        if (callback) {
          callback();
        }
      });
      return deferred.promise.$$state;
    },

    // Gets champion images for a given championID.
    getChampImages: function(champID) {
      
      var deferred = $q.defer();
      var imageID = [];
      var region = 'na';
      var urlBase = '/search/champ';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + '/' + region + '/' + champID + jsonCallback;
      $http.get(url)
      .then(function(res) {
        if (res.status == 200) {
          deferred.resolve(imageID = res.data.key);
        }
      });

      return deferred.promise.$$state;
    }
  };
}]);

LeagueStatTrackerApp.factory('$regions', ['$http', '$q', function($http, $q) {
  return {
    getRegions: function() {
      var deferred = $q.defer();
      var regions = [];

      var urlBase = '/regions';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + jsonCallback;
      $http.get(url)
      .then(function(res) {
        var options = res.data;
        deferred.resolve(regions = {
          repeatSelect: null,
          availableOptions: res.data,
          selectedOption: {"_id":"56ef9c3f6c332ceddc62c20a","id":7,"name":"na"}
        });
      });

      return deferred.promise.$$state;
    }
  };
}]);

LeagueStatTrackerApp.factory('$gameTypes', ['$http', '$q', function($http, $q) {
  return {
    getGameTypes: function(callback) {
      var deferred = $q.defer();
      var gameTypes = [];
      
      var urlBase = '/gametypes';
      var jsonCallback = '?callback=JSON_CALLBACK';
      var url = urlBase + jsonCallback;
      $http.get(url)
      .then(function(res) {
        deferred.resolve(gameTypes = res.data);
        if (callback) {
          callback();
        }
      });
      return deferred.promise.$$state
    }
  };
}]);
