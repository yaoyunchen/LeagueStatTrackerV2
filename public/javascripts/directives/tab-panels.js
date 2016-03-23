var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

// SUMMONER INFO TAB PANEL
// -----------------------
LeagueStatTrackerApp.directive('summonerinfo', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'summoner-info.ejs'
  }
});

// SUMMONER RECENT MATCHES TAB PANEL
// ---------------------------------
LeagueStatTrackerApp.directive('summonerrecent', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'summoner-recent.ejs'
  }
});


// SUMMONER RUNES TAB PANEL
// ------------------------
LeagueStatTrackerApp.directive('summonerrunes', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'summoner-runes.ejs'
  }
});

// SUMMONER MASTERIES TAB PANEL
// ----------------------------
LeagueStatTrackerApp.directive('summonermasteries', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'summoner-masteries.ejs'
  }
});