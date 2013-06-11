define([
	'lib/sound', 
	'lib/bufferLoader',
	'lib/audioContext'
], function(Sound, bufferLoader, audioContext){

	var audioContext = require('lib/audioContext').audioContext;

	describe('Sound', function() {

		var sound;
		var testFile = '/src/sounds/piano.mp3';
		var badFile = '/src/sounds/unsupportedFileType.png';

		beforeEach(function(){
			sound = new Sound;
		});

		afterEach(function() {
			sound = null;
		});

		it('should return a Sound constructor', function() {
			expect(sound).to.be.an.instanceOf(Sound);
			expect(Sound).to.be.a('function');
		});

		describe('#load', function() {

			beforeEach(function(){
				sinon.spy(sound, 'load');
				sinon.spy(bufferLoader, 'load');
			});

			afterEach(function() {
				sound.load.restore();
				bufferLoader.load.restore();
			});

			it('should set the sourceFile', function() {
				sound.load(testFile);
				expect(sound.load.thisValues[0].filePath).to.be.equal(testFile);
			});

			it('calls bufferLoader.load passing the filePath and a callback', function(){
				sound.load(testFile);
				expect(bufferLoader.load.args[0][0]).to.be.equal(testFile);
				expect(bufferLoader.load.args[0][1]).to.be.a('function');
			});
		});

		describe('#setBuffer', function() {
			it('should set the buffer to the Sound scope', function() {
				sound.setBuffer('testBuffer');
				expect(sound.buffer).to.be.equal('testBuffer');
			});

			it('should call the callback if provided', function() {
				var spy = sinon.spy();
				sound.setBuffer('', spy);
				expect(spy.called).to.be.true;
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
				sound.buffer = "test buffer";

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