// MAINCONTROLLER TESTS

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var app = require('../../app');
require('../_test-helper');

describe('mainController', function() {
 // Load the app module which contains the directives.
  beforeEach(angular.mock.module('LeagueStatTrackerApp'), ['ngRoute', 'ngAnimate', 'ngDialog', 'angularCharts']);

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller;
  }));

  beforeEach(function() {
    $scope = {};
    controller = $controller('mainController', {$scope: $scope});
  });

  describe('go()', function() {

  });       // go()
});       // mainController







