//cd into routes and $ mocha the file.

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var app = require('../../app');
require('../_test-helper');

chaiHttp = require('chai-http')
chai.use(chaiHttp);

describe('routes', function() {
  describe('/champs/:champID', function(){
    var res, err;
    var teemo = { 
      _id: '56f059c36c332ceddc62c315',
      id: '17',
      key: 'Teemo',
      name: 'Teemo',
      title: 'the Swift Scout' 
    };
    
    var path = '/champs/' + teemo.id;
    
    // Before any tests, connect to the LoL API.
    before(function(done){
      chai.request(app)
      .get(path)
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
          assert.isArray(res.body, '/champs/:champID response is an array');
        });

        it('should contain an object equal to teemo', function() {
          var results = res.body[0];
          results = delete results.freeToPlay;
          assert.deepEqual(teemo, res.body[0]);
        });
      });       // data
    });       // json response
  });       // /champs/:champID
});    // routes