define([
	'lib/utils',
	'lib/audioContext'
], function(utils){
	
	var audioContext = require('lib/audioContext').audioContext;

	/**
	* @constructor
	* @param {String} [filePath]
	*/
	function Sound(buffer) {
		if (!utils.isBuffer(buffer)) throw Error("Must pass AudioBuffer to Sound constructor");

		this.buffer = buffer;
		this.source = {};
		this.isPlaying = false;
	}

	/**
	* TODO: all the other fun stuff an audio graph can do
	*/
	Sound.prototype.connectAudioGraph = function() {
		this.source = audioContext.createBufferSource();
		this.source.buffer = this.buffer;                    		// tell the source which sound to play
		this.source.connect(audioContext.destination);      // connect the source to the audioContext's destination (the speakers)
		this.source.loop = true;
	}

	Sound.prototype.play = function() {
		this.connectAudioGraph();
		this.source.start(0.0);
		this.isPlaying = true;		
		//note: on older systems, may have to use deprecated noteOn(time);
	}

	Sound.prototype.stop = function() {
		this.source.stop(0.0);
		this.isPlaying = false;		
	}

	
	// return constructor

	return Sound;
});