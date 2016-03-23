var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

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
