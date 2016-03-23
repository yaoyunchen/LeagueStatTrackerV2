// Run with '$ karma start' if karma is installed globally, or '$gulp test' or '$gulp tdd'.

process.env.NODE_ENV = 'test';
"use strict";

describe('homepage', function() {
  var ele, compiled, scope, $compile, $location;

  // Load the modules to be tested using angular-mock.
  beforeEach(ngModule('LeagueStatTrackerApp'));
  beforeEach(ngModule('home.ejs'));

  beforeEach(inject(function(_$rootScope_, _$compile_, $injector, _$location_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $location = _$location_;
  }));

  beforeEach(function() {      
    ele = angular.element('<homepage></homepage>');
    compiled = $compile(ele)(scope);
    scope.$digest();
    scope.go = function() {
      return '/summoner';
    }
  });

  describe('summoner search button', function() {
    it('should have a button', function() {
      assert.equal(1, ele.find('button').length);
    });

    it('should call go() function', function() {
      sinon.spy(scope, 'go');
      compiled.find('button').triggerHandler('click');
      expect(scope.go).to.have.been.called;
      expect(scope.go).to.have.been.called.once;
    });

    it('should go to the summoners path.', function() {
      sinon.spy(scope, 'go');
      compiled.find('button').triggerHandler('click');
      expect(scope.go).to.have.been.calledWith('/summoner');
    });
  });

}); 
