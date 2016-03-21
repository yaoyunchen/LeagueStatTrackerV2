// REGION ROUTE TESTS

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var app = require('../../app');
require('../_test-helper');

describe('routes', function() {


  // Successful connection to LoL API to retrieve champions.
  describe('/regions', function(){
    var res, err;
    var northAmerica = { _id: '56ef9c3f6c332ceddc62c20a', id: 7, name: 'na' };
    // Before any tests, connect to the LoL API.
    before(function(done){
      chai.request(app)
      .get('/regions')
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
          assert.isArray(res.body, '/regions response is an array');
        });

        it('should have length of 10', function() {
          assert.equal(10, res.body.length);
        });

        it('array  elements should have key "id"', function() {
          var key = 'id';
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

        it('should contain north america', function() {
          var data = '';
          
          for (var i = 0; i < res.body.length - 1; i++ ) {
            if (res.body[i].name == 'na') {
              data = res.body[i];
              break;
            }
          }
          assert.deepEqual(northAmerica, data);
        });
      });       // data
    });       // json response
  });       // /regions
});    // routes