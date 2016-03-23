var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

LeagueStatTrackerApp.directive('homepage', ['$location', function($location) {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'home.ejs', 
    link: function(scope, ele, attrs) {
      scope.go = function(path) {
        $location.path(path);
      }
    }
  }
}]);


     

