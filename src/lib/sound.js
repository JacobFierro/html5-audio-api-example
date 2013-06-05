define([
	'lib/http',
	'lib/audioContext'
], function(http){
	
	var audioContext = require('lib/audioContext').audioContext;

	function Sound() {
		var buffer,
			file,
			source;
	}

	Sound.prototype.setSourceFile = function(filePath) {
		this.file = filePath;
	}

	Sound.prototype.getSourceFile = function() {
		return this.file;
	}

	Sound.prototype.load = function(filePath, callback) {
		var self = this;
		this.setSourceFile(filePath);

		http.get(filePath, 'arraybuffer', function(err, audioData){
			if (err) callback(err);

			audioContext.decodeAudioData(audioData, function(audioBuffer) {
		    	self.buffer = audioBuffer;
				callback(null);
		    }, function onError(){
		    	callback(new Error('Unable to decode the audio data from' + this.getSourceFile()));
		    });
		});
	}

	/**
	* TODO: this seems too simple, what about all that other crap you can do?
	*/
	Sound.prototype.play = function() {
		this.source = audioContext.createBufferSource(); // creates a sound source
		this.source.buffer = this.buffer;                    		// tell the source which sound to play
		this.source.connect(audioContext.destination);       // connect the source to the audioContext's destination (the speakers)
		this.source.start(0);                           		// play the source now
		// note: on older systems, may have to use deprecated noteOn(time);
	}

	Sound.prototype.stop = function() {

	}

	// return constructor

	return Sound;
});