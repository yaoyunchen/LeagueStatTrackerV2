// Create the LeagueStatTrackerApp module.
// ngRoute handles routing, allows for this to be single page app.
// ngAnimate allows adding transitions and animations.
// ngDialog is used for modal windows displaying recent match info.
// angularCharts is used to display the graph of summoner stats.
var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp', ['ngRoute', 'ngAnimate', 'ngDialog', 'angularCharts']);

// Configure routes to inject pages for single page views.
LeagueStatTrackerApp.config(function($routeProvider){
  $routeProvider
    // Homepage.
    .when('/', {      
      templateUrl : 'home.ejs',
      controller  : 'mainController'
    })
    // Summoner.
    .when('/summoner', {
      templateUrl : 'summoner.ejs',
      controller  : 'summonerController'
    })
});

