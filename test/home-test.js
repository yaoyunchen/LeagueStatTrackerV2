// HOMEPAGE TESTS

// Set to test.
process.env.NODE_ENV = 'test';

// // Dependencies.
//var mongoose = require('mongoose');
var app = require('../app');
var helper = require('../test/_test-helper');

chai = helper.chai;

// Extend each object with chai's 'assert' property.
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect();


describe('routes', function() {
  
  // Successful connection to the homepage.
  describe('/', function() {
    it ('should return 200', function(done) {
      chai.request(app)
      .get('/')
      .end(function(err, res) {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });

  // Successful connection to LoL API to retrieve champions.
  describe('/search/freechamps', function(){
    var res, err;

    // Before any tests, connect to the LoL API.
    before(function(done){
      chai.request(app)
      .get('/search/freechamps')
      .then(function(response) {
        res = response;
        done();
      }, function(error){
        err = error;
        done();
      })
    });
    
    it('should return 200', function() {
      assert.equal(200, res.statusCode);
    });

    // Check json response being returned.
    describe('json response', function() {
      it('should be json', function() {
        res.should.be.json;
      });
      it('should be an object', function() {
        assert.isObject(res.body, '/search/freechamps response is an object');
      });

      it('should have key of champions', function() {
        assert.equal('champions', Object.keys(res.body)[0]);
      });

      // Check if the returned data is accurate.
      describe('data', function() {
        it('should be an array', function() {
          assert.isArray(res.body['champions']);
        });

        it('should have length of 10', function() {
          assert.equal(10, res.body['champions'].length);
        });

        it('should all be free to play', function() {
          for (var i = 0; i < res.body['champions'].length; i++) {
            var freeToPlay = res.body['champions'][i].freeToPlay;
            assert.isTrue(freeToPlay, 'champion is free to play.');
          }
        });

      });       // data
    });       // json response
  });       // /search/freeChamps

  describe('/search/champ/:region/:champID', function() {
    var res, err;

    // Before any tests, connect to the LoL API.
    before(function(done){
      var region = 'na';
      // Data to compare against.
      // If there's a champion database, replace this.
      var teemo = {
        id: 17,
        key: "Teemo",
        name: "Teemo",
        title: "the Swift Scout",
        image: {
          full: "Teemo.png",
          sprite: "champion3.png",
          group: "champion",
          x: 288,
          y: 0,
          w: 48,
          h: 48
        }
      };

      var path = '/search/champ/' + region + '/' + teemo.id;
      chai.request(app)
      .get(path)
      .then(function(response) {
        res = response;
        done();
      }, function(error){
        err = error;
        done();
      })
    });       // before

    it('should return 200', function() {
      assert.equal(200, res.statusCode);
    });

    it('should be json', function() {
      res.should.be.json;
    });       
  });       // /search/champ/:region/:champID
});    // routes
