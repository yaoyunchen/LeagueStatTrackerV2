var LeagueStatTrackerApp = angular.module('LeagueStatTrackerApp');

//Summoner controller.  Used for looking up summoner info.
LeagueStatTrackerApp.controller('summonerController', ['$scope', 'ngDialog', '$summoner', '$regions', '$gameTypes', '$champions', function($scope, ngDialog, $summoner, $regions, $gameTypes, $champions) {
  // Adds a class to the page, used for identifying when styling.
  $scope.pageClass = "page-summoner";

  // Get the different realms in LoL.
  $scope.regions = $regions.getRegions();

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
      $scope.summoner = $summoner.get($scope.searchName, $scope.regions.value.selectedOption.name, function() {
        $scope.getStats();
        $scope.getRank();
        $scope.getRecent();
        $scope.iconUrl = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/profileicon/" + $scope.summoner.value.profileIconId + ".png";
      });
    }
  };

  // Get the stats of the summoners for various game types.
  $scope.getStats = function(callback) {
    $scope.summoner.stats = $summoner.getStats($scope.summoner.value.id, $scope.regions.value.selectedOption.name, function(){
      // Sorts the summoner stat data for display in the graph.
      $scope.getData("wins", "Total Wins");      
    });
  };

  // Gets the ranked stats of the summoner.
  $scope.getRank = function() {
    $scope.summoner.rank = $summoner.getRank($scope.summoner.value.id, $scope.regions.value.selectedOption.name);
  };

  // Gets the recent matches the summoner played.
  $scope.getRecent = function(callback) {
    $scope.summoner.recent = $summoner.getRecent($scope.summoner.value.id, $scope.regions.value.selectedOption.name, function(){
      
      $scope.getChamp();
    });
  };

  // Gets the champion data for the recent matches the summoner played, as well as the other summoners.
  $scope.getChamp = function() {

    $scope.summoner.recent.forEach(function(recent) {
      // Get the two teams and add to the recent.
      var teams = {
        teamOne: [],
        teamTwo: []
      }

      // Get the id and champion of other summoners in the game.
      recent.fellowPlayers.forEach(function(player) {
  
        var champ = $champions.getChamp(player.championId, function() {
          // Determine if the player is on team one or team two.
          if (player.teamId == 100) {
            teams.teamOne.push(
              {
                "id": player.summonerId,
                "champ": champ.value
              }
            );
          } else if (player.teamId == 200) {
            teams.teamTwo.push(
              {
                "id": player.summonerId,
                "champ": champ.value
              }
            );
          }
        })
      });

      // Get the summoner's id and champion onto the correct team.
      if (recent.teamId == 100) {
        var ownChamp = $champions.getChamp(recent.championId, function() {
          teams.teamOne.push(
            {
              "id": $scope.summoner.value.id,
              "champ": ownChamp.value
            }
          ); 
          recent.champ = ownChamp.value;         
        });
      }  else {
        var ownChamp = $champions.getChamp(recent.championId, function() {
          teams.teamTwo.push(
            {
              "id": $scope.summoner.value.id,
              "champ": ownChamp.value
            }
          ); 
          recent.champ = ownChamp.value;         
        });        
      } 
      // Adds the sorted team data to the corresponding recent match.
      recent.teams = teams;
    });
  };

  // Sorts the stat data of the summoner to be displayed on graphs.
  $scope.getData = function(type, title) {
    // Dont do anything if there hasn't been a search, so nothing is loaded on initial load.
    if ($scope.searchName == '') return false;

    $scope.getGameTypes(type, title, function() {
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
        for (var j = 0; j < $scope.gameTypes.value.length ; j++) {
          if (stats[i].playerStatSummaryType == $scope.gameTypes.value[j].type) {
            gameIndex = j;
            break;
          }
        }

        // x-axis display name of the game type.
        series.push($scope.gameTypes.value[gameIndex].name);

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
          x: $scope.gameTypes.value[gameIndex].code,
          y: [yData],
          tooltip: $scope.gameTypes.value[gameIndex].name
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
    });
  };

  // Various game modes of LoL.
  $scope.getGameTypes = function(type, title, callback) {
    $scope.gameTypes =  $gameTypes.getGameTypes(function() {
      if (callback) callback();
    });
  };
}]);