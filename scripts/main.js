// Configure RequireJS
require.config({
  baseUrl:'src/',
  urlArgs: "v="+(new Date()).getTime()
});

// Require libraries
require([
  'lib/sound',
  'vendor/jquery'
], function(Sound){
  var $playButton = $('#playTrigger');
  var $stopButton = $('#stopTrigger')

  var piano = new Sound;
  piano.load('/src/sounds/piano.mp3', function(err) {
    if (!!err) throw err;

    showButton();
    setButtonHandler();
  });

  function showButton() {
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
