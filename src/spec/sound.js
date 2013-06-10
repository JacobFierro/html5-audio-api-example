define(['lib/sound'], function(Sound){

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

		describe('load', function() {

			it('should set the sourceFile', function(done) {
				sound.load(testFile, function() {
					expect(sound.getFilePath()).to.be.equal(testFile);
					done();
				});	
			});

			it('should decode and set the buffer', function(done){
				sound.load(testFile, function() {
					expect(sound.buffer.constructor.name).to.be.equal('AudioBuffer');
					done();
				});
			});

			it('should call the callback with zero arguments', function(done) {
				sound.load(testFile, function() {
					expect(arguments.length).to.be.equal(0);
					done();
				});
			});

			it('should pass an error to the callback when decoding fails', function(done){
				sound.load(badFile, function(err) {
					expect(err.constructor.name).to.be.equal('Error');
					done();
				});
			});
		});

		describe('#play', function() {

			var scope;

			beforeEach(function(done) {
				sound.load(testFile, function() {
					done();
				});
			});

			afterEach(function() {
				sound.stop();
			});

			it('should create a source', function(){
				sound.play();
				expect(sound.source).to.exist;
			});

			it('should confirm play state with proper playState', function() {
				sound.play();
				expect(sound.isPlaying).to.be.true;
			});

		});



	});

})