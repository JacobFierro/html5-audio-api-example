// Configure RequireJS
require.config({
  baseUrl:'src/',
  urlArgs: "v="+(new Date()).getTime()
});

// Require libraries
require([
  'lib/bufferLoader',
  'lib/sound',
  'vendor/jquery'
], function(bufferLoader, Sound){
  var $playButton = $('#playTrigger');
  var $stopButton = $('#stopTrigger')

  var piano;

  bufferLoader.loadFile('/src/sounds/piano.mp3', onBufferLoad);

  function onBufferLoad(err, buffer) {
    if (err) throw err;

    piano = new Sound(buffer);
    showButtons();
    setButtonHandler();
  }

  function showButtons() {
    $playButton.show();
    $stopButton.show();
  }

  function setButtonHandler() {
    $playButton.on('click', function(){
      piano.play();
    });

    $stopButton.on('click', function(){
      piano.stop();
    });
  }
});
