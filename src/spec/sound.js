define([
	'lib/sound',
	'lib/utils',
	'lib/audioContext'
], function(Sound, utils){

	var audioContext = require('lib/audioContext').audioContext;

	describe('Sound', function() {

		var sound;
		var testFile = '/src/sounds/piano.mp3';
		var testBuffer = "test buffer";

		beforeEach(function(){
			var isBufferStub = sinon.stub(utils, 'isBuffer');
			isBufferStub.returns(true);
			sound = new Sound(testBuffer);
		});

		afterEach(function() {
			utils.isBuffer.restore();
			sound = null;
		});

		it('should return a Sound constructor', function() {
			expect(sound).to.be.an.instanceOf(Sound);
			expect(Sound).to.be.a('function');
		});

		describe('#constructor', function() {
			it('should throw error if AudioBuffer is not provided', function(){
				utils.isBuffer.restore();
				var isBufferStub = sinon.stub(utils, 'isBuffer');
				isBufferStub.returns(false); //force the error
				expect(Sound).to.throw(Error);
			});

			it('stores the provided buffer', function(){
				expect(sound.buffer).to.be.equal('test buffer');
			});

			it('should not be playing', function(){
				expect(sound.isPlaying).to.be.false;
			});
		});

		describe('#connectAudioGraph', function(){
			var connectSpy;

			beforeEach(function() {
				var createBufferStub = sinon.stub(audioContext, 'createBufferSource');
				connectSpy = sinon.spy();

				createBufferStub.returns({
					buffer : "",
					connect : connectSpy,
					loop : false					
				});

				sound.connectAudioGraph();
			});

			afterEach(function(){
				audioContext.createBufferSource.restore();
			});

			it('should instantiate a sound source from the audioContext', function(){
				expect(audioContext.createBufferSource.called).to.be.true;
			});

			it('should set the sound source buffer', function(){
				expect(sound.source.buffer).to.be.equal('test buffer');
			});

			it('should connect the souce to the destination', function(){
				expect(connectSpy.called).to.be.true;
				expect(connectSpy.args[0][0].constructor.name).to.be.equal("AudioDestinationNode");
			});
		});

		describe('#play', function() {

			var startStub;

			beforeEach(function() {
				sinon.stub(sound, 'connectAudioGraph');

				sound.source = {
					'start' : function(){}
				};

				startStub = sinon.stub(sound.source, 'start');
				sound.play();
			});

			afterEach(function() {
				sound.connectAudioGraph.restore();
				sound.source.start.restore();
			});

			it('should connect the audio graph before attemping to play', function() {
				expect(sound.connectAudioGraph.calledBefore(startStub)).to.be.true;
			});

			it('should start the sound immediately', function(){
				expect(startStub.args[0][0]).to.be.equal(0.0);
			});

			it('should set the isPlaying flag to true', function(){
				expect(sound.isPlaying).to.be.true;
			});

		});

		describe('#stop', function() {

			var stopStub;

			beforeEach(function() {
				sound.source = {
					'stop' : function(){}
				};

				stopStub = sinon.stub(sound.source, 'stop');
				sound.stop();
			});

			afterEach(function() {
				sound.source.stop.restore();
			});

			it('should stop the sound immediately', function(){
				expect(stopStub.args[0][0]).to.be.equal(0.0);
			});

			it('should set the isPlaying flag to false', function(){
				expect(sound.isPlaying).to.be.false;
			});

		});



	});

})