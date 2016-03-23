// HOMEPAGE TESTS

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var app = require('../../app');
require('../_test-helper');

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
});    // routes
