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

// TAB
// ---
// Represents a single pane in the tabs widget.
LeagueStatTrackerApp.directive('tab', function() {
  return {
    restrict: 'E',
    transclude: true,
    // Specify HTML template string to be insterted into the DOM when the element directive is used.
    // ng-show will automatically show active tabs.
    template: '<div role="tabpanel" class="tab" ng-show="active" ng-transclude></div>',
    // '^' instructs directive to move up the scope heirarchy one level and look for the controller on tabset.
    require: '^tabset',
    scope: {
      // '@' symbol means scope property must be a string.
      heading: '@'
    },
    // Specify linking function.
    link: function(scope, elem, attr, tabsetCtrl) {
      // Sets all tabs as inactive when they begin.
      scope.active = false;
      tabsetCtrl.addTab(scope);
    }
  }
});

// TABSET
// ------
// Used to wrap multiple tabs and provide the logic needed to select which tab is shown.
LeagueStatTrackerApp.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    templateUrl: 'tabset.ejs',
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
      var self = this;
      self.tabs = [];
      // Creates an array of tabs, and sets the tab to be active.
      self.addTab = function addTab(tab) {
        self.tabs.push(tab);
        if (self.tabs.length === 1) {
          tab.active = true;
        }
      }
      // Deselects (removes active) tabs that were selected before, and sets the newly selected tab to be the active tab.
      self.select = function(selectedTab) {
        angular.forEach(self.tabs, function(tab) {
          if (tab.active && tab != selectedTab) {
            tab.active = false;
          }
        })
        selectedTab.active = true;
      }
    }
  }
});

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

// SLIDESHOW
// ---------
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
                // Since $watch dirty checks, make sure all the data is prepared before starting the slideshow.
                if (ele.value != undefined) {
                  var url = "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + ele.value + "_0.jpg";
                  var name = ele.value
                }
                if (url) {
                  urls.push(url);
                }
                if (name) {
                  names.push(name);
                }
              })
              if (urls.length == 10) {
                 scope.images = urls;
              }
              if (names.length == 10) {
                scope.names = names;
                scope.champName = names[scope.active_image];
              }
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

