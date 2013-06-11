define([
	'lib/audioContext',
	'lib/http'
], function(audioContext, http){

	var audioContext = require('lib/audioContext').audioContext;
	
	function load(filePath, callback) {
		http.get(filePath, 'arraybuffer', function(err, audioData){
			decodeResponse(err, audioData, callback);
		});
	}

	function decodeResponse(err, audioData, callback) {
		if (err) callback(err);

		audioContext.decodeAudioData(audioData, function(audioBuffer) {
			callback(null, audioBuffer);
	    }, function onError(){
	    	callback(Error('Failure to decode AudioData from file.'));
	    });
	}

	return {
		load: load
	}

});