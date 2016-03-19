var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/LoLStatTracker-dev',
  test: 'mongodb://localhost/LoLStatTracker-test', 
  production: ''
}

module.exports = config;