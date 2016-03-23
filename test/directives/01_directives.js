// MAINCONTROLLER TESTS

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var app = require('../../app');

require('../../node_modules/angular/angular.js');
require('../../node_modules/angular-mocks/angular-mocks.js');
require('../../node_modules/angular-route/angular-route.js');
require('../../node_modules/angular-animate/angular-animate.js');
require('../../node_modules/ng-dialog/js/ngDialog.js');
require('../../vendor/angular-charts-0.2.6/dist/angular-charts.js');
require('../../public/javascripts/angularApp.js');
require('../../public/javascripts/factories.js');
require('../../public/javascripts/directives.js');
require('../_test-helper');
describe('directives', function() {
  var ele, scope, compile;
  
  // Load the module to be tested using angular-mock.
  beforeEach(ngModule('LeagueStatTrackerApp'));

  // Create new scope before each test.
  beforeEach(inject(function(_$rootScope_, $compile) {
    scope = _$rootScope_.$new();
    scope.testModel = 'test';
  }));

  // Compile a directive with the template
  function compileDirective(template) {
    if (!template) template = '<div ng-model="testModel"><p>TEST</p></div>';

    inject(function($compile) {
      var page = $compile(template)(scope);
      console.log(page.find('div'))
      ele = page.find('div')
    });
  }

  describe('initialization', function() {
    beforeEach(function() {
      compileDirective();
    });
    it('should have scope testModel of "test"', function() {
      //assert.equal(2, ele.find('div').length);
    });
  });
  // describe('homepage', function() {
  //   it('should automatically render to "/"', function() {

  //   })
  // });



});       // directives
