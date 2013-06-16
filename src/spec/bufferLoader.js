define([
	'lib/bufferLoader'
], function(bufferLoader){
	describe('bufferLoader', function() {
		
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
});