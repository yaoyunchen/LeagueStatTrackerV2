// REGION ROUTE TESTS

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var app = require('../../app');
require('../_test-helper');

describe('routes', function() {


  // Successful connection to LoL API to retrieve champions.
  describe('/gametypes', function(){
    var res, err;
    // Before any tests, connect to the LoL API.
    before(function(done){
      chai.request(app)
      .get('/gametypes')
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

      // Check if the returned data is accurate.
      describe('data', function() {
        it('should be an array', function() {
          assert.isArray(res.body, '/gametypes response is an array');
        });

        it('array  elements should have key "type"', function() {
          var key = 'type';
          for (var i = 0; i < res.body.length - 1; i++) {
            assert.isTrue(res.body[i].hasOwnProperty(key));
          }
        });
        it('array  elements should have key "name"', function() {
          var key = 'name';
          for (var i = 0; i < res.body.length - 1; i++) {
            assert.isTrue(res.body[i].hasOwnProperty(key));
          }
        });
        it('array  elements should have key "code"', function() {
          var key = 'code';
          for (var i = 0; i < res.body.length - 1; i++) {
            assert.isTrue(res.body[i].hasOwnProperty(key));
          }
        });
      });       // data
    });       // json response
  });       // /gametypes
});    // routes