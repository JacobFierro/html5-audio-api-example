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
  var $button = $('#soundTrigger');

  var piano = new Sound;
  piano.load('/src/sounds/piano.mp3', function(err) {
    if (!!err) throw err;

    showButton();
    setButtonHandler();
  });

  function showButton() {
    $button.show();
  }

  function setButtonHandler() {
    $('#soundTrigger').on('click', function(){
      piano.play();
    });
  }
});
