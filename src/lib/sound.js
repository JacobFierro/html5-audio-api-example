define([
	'lib/http',
	'lib/audioContext'
], function(http){
	
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
		var self = this;
		this.setFilePath(filePath);

		http.get(filePath, 'arraybuffer', function(err, audioData){
			if (err) callback(err);

			audioContext.decodeAudioData(audioData, function(audioBuffer) {
		    	self.buffer = audioBuffer;
				callback();
		    }, function onError(){
		    	callback(Error('Unsupported file type from: ' + self.getFilePath()));
		    });
		});
	}

	Sound.prototype.createSource = function() {
		this.source = audioContext.createBufferSource();
		this.source.buffer = this.buffer;                    		// tell the source which sound to play
		this.source.connect(audioContext.destination);      // connect the source to the audioContext's destination (the speakers)
		this.source.loop = true;
	}

	/**
	* TODO: this seems too simple, what about all that other crap you can do?
	*/
	Sound.prototype.play = function() {
		this.createSource();
		this.source.start(0.0);
		this.isPlaying = true;		
		//note: on older systems, may have to use deprecated noteOn(time);
	}

	Sound.prototype.stop = function() {
		this.source.stop(0.0);
		this.isPlaying = false;		
	}

	/**
	* todo: playbackState isn't updating fast enough to accurately catch it here
	*		and buffersourcenode doesn't implement addEventListener
	*/ 
	/*
	Sound.prototype.setPlayState = function() {
		var playStates = {
			0 : "UNSCHEDULED_STATE",
			1 : "SCHEDULED_STATE",
			2 : "PLAYING_STATE",
			3 : "FINISHED_STATE"
		};

		var playbackcode = (!!this.source) ? this.source.playbackState : 0;
		this.playState = playStates[playbackcode];
	}
	*/

	// return constructor

	return Sound;
});