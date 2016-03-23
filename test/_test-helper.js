global.proxyquire = require('proxyquire');
global.sinon = require('sinon');

var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
var sinonChai = require('sinon-chai');

chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.use(sinonChai);

global.chai = chai;
// Extend each object with chai's 'assert' property.
global.assert = chai.assert;
global.should = chai.should();
global.expect = chai.expect;

var jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head><script></script></head><body></body></html>');
global.window = global.document.parentWindow;
global.nagivator = window.nagivator = {};
global.Node = window.Node;

global.window.mocha = {};

beforeEach(function() {
  // Create a sandbox for each test.
  this.sinon = sinon.sandbox.create();
});

afterEach(function() {
  // Clean up sandbox to remove all stubs.
  this.sinon = sinon.restore();
})

global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;

require('angular/angular');
require('angular-mocks');

global.angular = window.angular;
// global.angular.mock = window.angular.mock;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;