define([
	'lib/audioContext',
	'lib/http'
], function(audioContext, http){

	var audioContext = require('lib/audioContext').audioContext;

	function loadFile(filePath, callback) {
		http.get(filePath, 'arraybuffer', function(err, audioData){
			decodeResponse(err, audioData, callback);
		});
	}

	function decodeResponse(err, audioData, callback) {
		if (err) callback(err);

		audioContext.decodeAudioData(audioData, function(audioBuffer) {
			callback(null, audioBuffer);
	    }, function onError(){
	    	callback(Error('Failed to create buffer from audioData'));
	    });
	}

	return {
		loadFile: loadFile
	}
});