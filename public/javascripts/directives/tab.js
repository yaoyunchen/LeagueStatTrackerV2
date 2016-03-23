var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

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