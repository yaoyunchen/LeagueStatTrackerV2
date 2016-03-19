var helper = {};

var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.use(sinonChai);

helper.chai = chai;

module.exports = helper;