// NAVBAR TESTS

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var app = require('../app');
require('../test/_test-helper');
require('../public/javascripts/angularApp.js');
require('../public/javascripts/directives.js');


describe('navbar', function() {

  describe('navbar viewer directive', function() {
    beforeEach(function() {
      var self = this;

      angular.mock.module('LeagueStatTrackerApp', [
      ]);
    });
  });       // navbar viewer directive




});       // navbar