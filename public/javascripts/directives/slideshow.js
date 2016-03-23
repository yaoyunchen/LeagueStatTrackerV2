var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

LeagueStatTrackerApp.directive("ngbgslideshow", function($interval) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'slideshow.ejs',
        link: function( scope, elem, attrs ) {
          // Which image is active, set initially to first image.
          scope.active_image = 0;
          // Time until image changes.
          scope.interval = 5000;

          // Watch for changes in scope.freeChamps, so slideshow will load once there's data for it to work with.
          scope.$watch( 'freeChamps', function() {
            if (scope.freeChamps.images != undefined) {
              
              // Image urls from the LoL static constants database.
              var urls = [];
              // Names of the champion corresponding to the image.
              var names = [];
              
              scope.freeChamps.images.forEach(function(ele) {
                urls.push("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + ele.value[0].key + "_0.jpg");
                names.push(ele.value[0].name);
              });
              
              scope.images = urls;
              scope.names = names;
              scope.champName = names[scope.active_image];
            }
          }, true);

          // Change the image.
          var change = $interval(function() {
            scope.active_image++;
            scope.champName = scope.names[scope.active_image]
            if( scope.active_image >= scope.images.length )
              scope.active_image = 0;
              scope.champName = scope.names[scope.active_image]
          }, scope.interval || 1000 );
      
          scope.$on('$destroy', function() {
            $interval.cancel( change );
          });
        }
    };  
});    