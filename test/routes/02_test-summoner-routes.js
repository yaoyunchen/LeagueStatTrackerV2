//cd into routes and $ mocha the file.

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var app = require('../../app');
require('../_test-helper');

chaiHttp = require('chai-http')
chai.use(chaiHttp);

describe('routes', function() {
  
  // Successful connection to the summoner page.
  describe('/summoner', function() {
    it ('should return 200', function(done) {
      chai.request(app)
      .get('/')
      .end(function(err, res) {
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });

  // Connection to LoL API to retrieve summoner information based on summoner name.
  describe('/search/:region/:summonerName', function(){
    var res, err;

    var region = 'na';
    var summoner = { 
      cowsgomur: {
        id: 19134944,
        name: 'cowsgomur'
      } 
    };
    var path = '/search/' + region + '/' + Object.keys(summoner)[0];

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
      });
    });
    
    // Checks if the route successfully returns data.
    it('should return 200 for valid route', function() {
      assert.equal(200, res.statusCode);
    });

    // Check json response being returned.
    describe('json response', function() {
      it('should be json', function() {
        res.should.be.json;
      });

      // Check if the returned data is valid.
      it('should not have status code 404 in body for a valid summoner ID', function() {
        assert.isFalse(res.body.hasOwnProperty('status'), 'should not have status in response');
      });

      // Check if the returned data is accurate.
      describe('data', function() {
        it('should be an object', function() {
          assert.isObject(res.body, '/search/:region/:summonerName response is an object');
        });

        it('should have key of "cowsgomur"', function() {
          assert.equal('cowsgomur', Object.keys(res.body)[0]);
        });
        // Deep equal does not work here as data is not static.
        it('should match the summoner id and name', function() {
          assert.equal(summoner.id, Object.keys(res.body)[0].id);
          assert.equal(summoner.name, Object.keys(res.body)[0].name);
        });
      });       // data
    });       // json response
  });       // /search/:region/:summonerName

  // Get the stats of a summoner.
  describe('/search/stats/:region/:summonerID', function() {
    var res, err;
    var region = 'na';
    var summonerID = '19134944';
    var path = '/search/stats/' + region + '/' + summonerID;

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

    // Checks if the route successfully returns data.
    it('should return 200 for valid route', function() {
      assert.equal(200, res.statusCode);
    });

    // Check json response being returned.
    describe('json response', function() {
      it('should be json', function() {
        res.should.be.json;
      });

      // Check if the returned data is valid.
      it('should not have status code 404 in body for a valid summoner ID', function() {
        assert.isFalse(res.body.hasOwnProperty('status'), 'should not have status in response');
      });

      // Check if the returned data is accurate.
      describe('data', function() {
        it('should be an object', function() {
          assert.isObject(res.body, '/search/:region/:summonerName response is an object');
        });

        it('should have key of "summonerId"', function() {
          assert.equal('summonerId', Object.keys(res.body)[0]);
        });

        it('should have value of 19134944 for summonerId ', function() {
          assert.equal(19134944,  res.body.summonerId)
        })

        it('should have key of "playerStatSummaries"', function() {
          assert.equal('playerStatSummaries', Object.keys(res.body)[1]);
        });

        it('should have an array for playerStatSummaries', function() {
          assert.isArray(res.body.playerStatSummaries);
        });
      });       // data
    });       // json response
  });       // /search/stats/:region/:summonerID

  // Ranked information of a summoner.
  describe('/search/rank/:region/:summonerID', function() {
    var res, err;
    var region = 'na';
    var summonerID = '19148112';
    var path = '/search/rank/' + region + '/' + summonerID;

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

    // Checks if the route successfully returns data.
    it('should return 200 for valid route', function() {
      assert.equal(200, res.statusCode);
    });

    // Check json response being returned.
    describe('json response', function() {
      it('should be json', function() {
        res.should.be.json;
      });

      // Check if the returned data is valid.
      it('should not have status code 404 in body for a valid summoner ID', function() {
        assert.isFalse(res.body.hasOwnProperty('status'), 'should not have status in response');
      });

      // Check if the returned data is accurate.
      describe('data', function() {
        it('should be an object', function() {
          assert.isObject(res.body, '/search/rank/:region/:summonerID response is an object');
        });

        it('should have key of 19148112', function() {
          assert.equal(19148112, Object.keys(res.body)[0]);
        });

        it('should return an array', function() {
          assert.isArray(res.body[Object.keys(res.body)[0]]);
        });
      });       // data
    });       // json response
  });       // /search/rank/:region/:summonerID

  describe('/search/recent/:region/:summonerID', function() {
    var res, err;
    var region = 'na';
    var summonerID = '19134944';
    var path = '/search/recent/' + region + '/' + summonerID;

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

    // Checks if the route successfully returns data.
    it('should return 200 for valid route', function() {
      assert.equal(200, res.statusCode);
    });

    // Check json response being returned.
    describe('json response', function() {
      it('should be json', function() {
        res.should.be.json;
      });

      // Check if the returned data is valid.
      it('should not have status code 404 in body for a valid summoner ID', function() {
        assert.isFalse(res.body.hasOwnProperty('status'), 'should not have status in response');
      });

      // Check if the returned data is accurate.
      describe('data', function() {
        it('should be an object', function() {
          console.log(res.body)
          assert.isObject(res.body, '/search/recent/:region/:summonerID response is an object');
        });

        it('should have key of "summonerId"', function() {
          assert.equal('summonerId', Object.keys(res.body)[0]);
        });

        it('should have value of 19134944 for summonerId ', function() {
          assert.equal(19134944,  res.body.summonerId)
        })

        it('should have key of "games"', function() {
          assert.equal('games', Object.keys(res.body)[1]);
        });

        it('should have an array for games', function() {
          assert.isArray(res.body.games);
        });
      });       // data
    });       // json response
  });       ///search/recent/:region/:summonerID
});       // routes