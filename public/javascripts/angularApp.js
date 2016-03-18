// Create the LeagueStatTrackerApp module.
// ngRoute handles routing, allows for this to be single page app.
// ngAnimate allows adding transitions and animations.
// ngDialog is used for modal windows displaying recent match info.
// angularCharts is used to display the graph of summoner stats.
var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp', ['ngRoute', 'ngAnimate', 'ngDialog', 'angularCharts']);

// CONSTANTS
// ---------
// Should be moved to the back-end or saved to mongoDB.
// Different summoners are in every region.
LeagueStatTrackerApp.constant('REGIONS', {
  repeatSelect: null,
  availableOptions: [
    {id: '1', name: 'br'},
    {id: '2', name: 'eune'},
    {id: '3', name: 'euw'},
    {id: '4', name: 'kr'},
    {id: '5', name: 'lan'},
    {id: '6', name: 'las'},
    {id: '7', name: 'na'},
    {id: '8', name: 'oce'},
    {id: '9', name: 'ru'},
    {id: '10', name: 'tr'}
  ],
  selectedOption: {id: '7', name: 'na'}
})

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

// CONTROLLERS
// -----------

// Main controller for the home page.
LeagueStatTrackerApp.controller('mainController', ['$scope', '$champions', '$location', function($scope, $champions, $location) {
  // Adds a class to the injected home page, used mainly for styling.
  $scope.pageClass = "page-home";

  // Clicking the summoner search button will redirect to the summoner page.
  // If possible, replace the redirect with the summoner search bar from the summoner page instead.  When a name is searched, automatically go to summoner page with the results.
  $scope.go = function(path) {
    $location.path(path);
  }

  // Determine the current free champions, with a callback to get the champion images from the results.
  $scope.freeChamps = $champions.getFree(function() {
    $scope.getChampImages();
  });

  // Gets the static champion images.  Used to populate the slideshow display on the home page
  $scope.getChampImages = function() {
    if ($scope.freeChamps.value.length == 10) {
      var images = [];
      for (var i = 0; i < $scope.freeChamps.value.length; i ++) {
        // Gets the image for a champion from the champion factory in factories.js, which calls the LoL API.
        $scope.img = $champions.getChampImages($scope.freeChamps.value[i].id);
        images.push($scope.img);
      }

      // Adds the array of images to the scope to use in the html.
      $scope.freeChamps.images = images;
    } 
  };
 }]);


//Summoner controller.  Used for looking up summoner info.
LeagueStatTrackerApp.controller('summonerController', ['$scope', '$summoner', 'ngDialog', 'REGIONS', function($scope, $summoner, ngDialog, REGIONS) {
  // Adds a class to the page, used for identifying when styling.
  $scope.pageClass = "page-summoner";

  $scope.regions = REGIONS;
  
  // Value entered into the form input field when searching for a summoner.
  $scope.searchName = '';

  // All summoner data will be saved in summoner.
  $scope.summoner;

  // Profile icon set to default initially.
  $scope.iconUrl = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/profileicon/0.png"

  // When the seach button (or Enter key) is pressed, look up the summoner name, in the LoL API to get the ID, and use the ID in a callback to get the summoner's stats.
  $scope.summonerSearch = function(isValid) {
    // Is valid is from the form field validations.  Only search if validations pass.
    if (isValid) {
      // Get data from the summoner factory.
      $scope.summoner = $summoner.get($scope.searchName, $scope.regions.selectedOption.name, function() {
        $scope.getStats();
        $scope.getRecent();
        $scope.getRank();
        $scope.getRunes();
        $scope.getMasteries();
        $scope.iconUrl = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/profileicon/" + $scope.summoner.value.profileIconId + ".png";
      });
    }
  };

  // Get the stats of the summoners for various game types.
  $scope.getStats = function(callback) {
    $scope.summoner.stats = $summoner.getStats($scope.summoner.value.id, $scope.regions.selectedOption.name, function(){
      // Sorts the summoner stat data for display in the graph.
      $scope.getData("wins", "Total Wins");      
    });
  };

  // Gets the ranked stats of the summoner.
  $scope.getRank = function() {
    $scope.summoner.rank = $summoner.getRank($scope.summoner.value.id, $scope.regions.selectedOption.name);
  };

  // Gets the recent matches the summoner played.
  $scope.getRecent = function(callback) {
    $scope.summoner.recent = $summoner.getRecent($scope.summoner.value.id, $scope.regions.selectedOption.name, function(){
      $scope.getChamp();
    });
  };

  // Gets the champion data for the recent matches the summoner played, as well as the other summoners.
  $scope.getChamp = function() {
    for (var i = 0; i < $scope.summoner.recent.length; i++) {

      // Get the two teams and add to the recent.
      var teams = {
        teamOne: [],
        teamTwo: []
      }
      var champ;

      // Get the id and champion of other summoners in the game.
      $scope.summoner.recent[i].fellowPlayers.forEach(function(player) {
        
        champ = $summoner.getChamp(player.championId, $scope.regions.selectedOption.name);

        // Determine if the player is on team one or team two.
        if (player.teamId == 100) {
          teams.teamOne.push(
            {
              "id": player.summonerId,
              "champ": champ
            }
          );
        } else if (player.teamId == 200) {
          teams.teamTwo.push(
            {
              "id": player.summonerId,
              "champ": champ
            }
          );
        }
      })

      // Get the summoner's id and champion onto the correct team.
      if ($scope.summoner.recent[i].teamId == 100) {
        $scope.summoner.recent[i].champ = $summoner.getChamp($scope.summoner.recent[i].championId, $scope.regions.selectedOption.name)
        teams.teamOne.push(
          {
            "id": $scope.summoner.value.id,
            "champ": $scope.summoner.recent[i].champ
          }
        );
      }  else {
        $scope.summoner.recent[i].champ = $summoner.getChamp($scope.summoner.recent[i].championId, $scope.regions.selectedOption.name)
        teams.teamTwo.push(
          {
            "id": $scope.summoner.value.id, 
            "champ": $scope.summoner.recent[i].champ
          }
        );
      } 

      // Adds the sorted team data to the corresponding recent match.
      $scope.summoner.recent[i].teams = teams;
    }
  }

  // Gets the summoner's rune pages data.
  // Currently only gets data, not sorted or displayed.
  $scope.getRunes = function() {
    $scope.summoner.runes = $summoner.getRunes($scope.summoner.value.id, $scope.regions.selectedOption.name);
  };

  // Gets the summoner's masteries data.
  $scope.getMasteries = function() {
    $scope.summoner.masteries = $summoner.getMasteries($scope.summoner.value.id, $scope.regions.selectedOption.name);
  };

  // Sorts the stat data of the summoner to be displayed on graphs.
  $scope.getData = function(type, title) {
    // Dont do anything if there hasn't been a search, so nothing is loaded on initial load.
    if ($scope.searchName == '') {
      return false;
    }

    // Various game modes of LoL.
    // This should be put into the database.
    var gametypes = [
      {
        // What LoL API calls it.
        type: "CAP5x5",
        // What we call it.
        name: "Team Builder",
        // For display on the x-axis.
        code: "TB"
      },
      {
        type: "CoopVsAI",
        name: "Coop 5 v 5",
        code: "COOP5"
      }, 
      {
        type: "CoopVsAI3x3",
        name: "Coop 3 v 3",
        code: "COOP3"
      },
      {
        type: "OdinUnranked",
        name: "Dominion",
        code: "DOM"
      },
      {
        type: "RankedTeam3x3",
        name: "Ranked 3 v 3",
        code: "R3"
      },
      {
        type: "RankedTeam5x5",
        name: "Ranked Team",
        code: "RTeam"
      },
      {
        type: "Unranked3x3",
        name: "Twisted Treeline",
        code: "TT"
      },
      {
        type: "RankedSolo5x5",
        name: "Ranked Solo",
        code: "R1"
      },
      {
        type: "AramUnranked5x5",
        name: "All Random All Mid",
        code: "ARAM"
      },
      {
        type: "Unranked",
        name: "Normal",
        code: "NORM"
      },
      {
        type: "RankedPremade5x5",
        name: "Ranked 5 v 5",
        code: "R5"
      }
    ];

    var stats = $scope.summoner.stats;

    // Data for the x-axis display of the graph.
    var series = [];
    // Data to be displayed in the bar graph.
    var data =  [];

    for (var i = 0; i < stats.length; i++) {

      // Index of each game type.
      var gameIndex;

      // The numerical part of the graph (wins, kills, etc).
      var yData;

      // For loop instead of forEach, so break can be used.
      for (var j = 0; j < gametypes.length ; j++) {
        if (stats[i].playerStatSummaryType == gametypes[j].type) {
          gameIndex = j;
          break;
        }
      }

      // x-axis display name of the game type.
      series.push(gametypes[gameIndex].name);

      var aggrStats = stats[i].aggregatedStats;

      // yData will be zero if the summoner has not played that type of game mode.
      switch(type) {
        case 'wins':
          yData = stats[i].hasOwnProperty('wins') ? stats[i].wins : 0;
          
          break;
        case 'totalchampionkills':
          yData = aggrStats.hasOwnProperty('totalChampionKills') ? aggrStats.totalChampionKills : 0;

          break;
        case 'totalneutralminionskilled':
          yData = aggrStats.hasOwnProperty('totalNeutralMinionsKilled') ? aggrStats.totalNeutralMinionsKilled : 0;

          break;
        case 'totalminionkills':
          yData = aggrStats.hasOwnProperty('totalMinionKills') ? aggrStats.totalMinionKills : 0;

          break;
        case 'totalassists':
          yData = aggrStats.hasOwnProperty('totalAssists') ? aggrStats.totalAssists : 0;

          break;
        case 'totalturretskilled':
          yData = aggrStats.hasOwnProperty('totalTurretsKilled') ? aggrStats.totalTurretsKilled : 0;

          break;
        default:
          yData = 0;
      }

      // Gather the data and push to the array.
      var dataset = {
        x: gametypes[gameIndex].code,
        y: [yData],
        tooltip: gametypes[gameIndex].name
      };
      data.push(dataset);
    }

    // Configuration settings for the graph.
    $scope.config = {
      title: title,
      tooltips: true,
      labels: true,
      isAnimate: true
    };

    // Data for the graph.
    $scope.data = {
      series: series,
      data: data
    };
  }
}]);



