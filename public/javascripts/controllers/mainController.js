var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

// Main controller for the home page.
LeagueStatTrackerApp.controller('mainController', ['$scope', '$champions', '$location', function($scope, $champions, $location) {
  // Adds a class to the injected home page, used mainly for styling.
  $scope.pageClass = "page-home";

  // Determine the current free champions, with a callback to get the champion images from the results.
  $scope.freeChamps = $champions.getFree(function() {
    $scope.getChamps();
  });
  
  // Gets the static champion images.  Used to populate the slideshow display on the home page
  $scope.getChamps = function() {
    if ($scope.freeChamps.value.length == 10) {
      var images = [];

      $scope.freeChamps.value.forEach(function(champ) {
        var img = $champions.getChamp(champ.id, function() {
          images.push(img);
          if (images.length == 10) {
            $scope.freeChamps.images = images;
          }
        });
      });
    } 
  };
 }]);