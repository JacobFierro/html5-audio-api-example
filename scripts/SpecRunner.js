// Configure RequireJS
require.config({
  baseUrl:'src/',
  urlArgs: "v="+(new Date()).getTime()
});

// Require libraries
require([
  'require', 
  'vendor/chai', 
  'vendor/sinon', 
  'vendor/mocha',
  'vendor/jquery'
  ], function(require,chai,sinon){

  // Chai
  assert = chai.assert;
  should = chai.should();
  expect = chai.expect;

  // Mocha
  mocha.setup({
    ui: "bdd",
    globals:["XMLHttpRequest"]
  });

  // Require base tests before starting
  require([
    'spec/audioContext',
    'spec/http',
    'spec/sound',
    'spec/bufferLoader'
  ], 
  function(){
    // Start runner
    mocha.run();
  });

});
