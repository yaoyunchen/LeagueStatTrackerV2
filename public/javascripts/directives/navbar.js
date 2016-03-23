var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

// NAVBAR
// ------
LeagueStatTrackerApp.directive('navbar', function() {
  return {
    restrict: 'E',
    // Directive will insert any content included between <navbar></navbar>.
    transclude: true,
    scope: { },
    templateUrl: 'navbar.ejs'
  }
});