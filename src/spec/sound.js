define(['lib/sound'], function(Sound){

	describe('Sound', function() {

		var sound;
		var testFile = '/src/sounds/piano.mp3';

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

		it('set the sourceFile', function(done) {
			sound.load(testFile, function() {
				expect(sound.getSourceFile()).to.be.equal(testFile);
				done();
			});	
		});
	});

})