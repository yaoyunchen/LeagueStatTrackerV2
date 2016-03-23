var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

// HOMEPAGE
// --------
LeagueStatTrackerApp.directive('homepage', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'home.ejs'
  }
});


     

