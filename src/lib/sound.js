define([
	'lib/bufferLoader',
	'lib/audioContext'
], function(bufferLoader){
	
	var audioContext = require('lib/audioContext').audioContext;

	/**
	* @constructor
	* @param {String} [filePath]
	*/
	function Sound() {
		this.buffer = null;
		this.filePath = "";
		this.source = {};
		this.isPlaying = false;
	}

	Sound.prototype.setFilePath = function(filePath) {
		this.filePath = filePath;
	}

	Sound.prototype.getFilePath = function() {
		return this.filePath;
	}

	Sound.prototype.load = function(filePath, callback) {
		if (typeof callback !== "function") callback = function(){};
		this.setFilePath(filePath);
		
		var self = this;
		bufferLoader.load(filePath, function(err, buffer) {
			if (err) throw err;
			self.setBuffer(buffer, callback);
		});
	}

	Sound.prototype.setBuffer = function(buffer, cb) {
		this.buffer = buffer;
		if (typeof cb === 'function') cb();
	}

	Sound.prototype.connectAudioGraph = function() {
		this.source = audioContext.createBufferSource();
		this.source.buffer = this.buffer;                    		// tell the source which sound to play
		this.source.connect(audioContext.destination);      // connect the source to the audioContext's destination (the speakers)
		this.source.loop = true;
	}

	/**
	* TODO: this seems too simple, what about all that other crap you can do?
	*/
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