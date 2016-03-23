// HOMEPAGE TESTS

// Set to test.
process.env.NODE_ENV = 'test';

// Dependencies.
var Champions = require('../../models/champions');
var GameTypes = require('../../models/gametypes');
var Regions = require('../../models/regions');
require('../_test-helper');

describe ('models', function() {
  
  describe ('champions', function() {
    var schema = Champions.schema.paths;
    it('should be defined', function() {
      assert.isDefined(Champions, 'Champions model defined');
      // expect(Champions).to.exist;
    });

    it('should have id string field', function() {
      assert.isDefined(schema.id, 'ID field defined');
      // expect(schema.id).to.exist;
      assert.equal('String', schema.id.instance, 'Instance of String');
      // expect(schema.id.instance).to.equal('String');
    });

    it('should have key string field', function() {
      assert.isDefined(schema.key, 'Key field defined');
      assert.equal('String', schema.key.instance, 'Instance of String');
    });

    it('should have name string field', function() {
      assert.isDefined(schema.name, 'Name field defined');
      assert.equal('String', schema.name.instance, 'Instance of String');
    });

    it('should have title string field', function() {
      assert.isDefined(schema.title, 'Title field defined');
      assert.equal('String', schema.title.instance, 'Instance of String');
    });
  });       // champions

  describe ('gametypes', function() {
    var schema = GameTypes.schema.paths;
    it('should be defined', function() {
      assert.isDefined(GameTypes, 'GameTypes model defined');
    });

    it('should have type string field', function() {
      assert.isDefined(schema.type, 'Type field defined');
      assert.equal('String', schema.type.instance, 'Instance of String');
    });

    it('should have name string field', function() {
      assert.isDefined(schema.name. 'Name field defined');
      assert.equal('String', schema.name.instance, 'Instance of String');
    });

    it('should have code string field', function() {
      assert.isDefined(schema.code, 'Code field defined');
      assert.equal('String', schema.code.instance, 'Instance of String');
    });
  });       // gametypes

  describe ('regions', function() {
    var schema = Regions.schema.paths;
    it('should be defined', function() {
      assert.isDefined(Regions, 'Regions model defined');
    });

    it('should have id string field', function() {
      assert.isDefined(schema.id, 'ID field defined');
      assert.equal('Number', schema.id.instance, 'Instance of String');
    });

    it('should have name string field', function() {
      assert.isDefined(schema.name, 'Name field defined');
      assert.equal('String', schema.name.instance, 'Instance of String');
    });
  });       // gametypes
});       // models