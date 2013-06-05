define(['lib/audioContext'],function(Context){

  describe('AudioContext', function(){
  	var context;
	try {
		context = Context.getAudioContext();
	} catch(e) {
		console.log('AudioContext not supported, not continuing test suite');
	}
  	
  	it('should be supported by this browser', function(){
  		expect(Context.getAudioContext).not.to.throw(Error);
  	});

  	if (!!context) {
	  	describe('attributes', function(){

		    it('should have the attribute: sampleRate >= 22,050 sampe-frames/sec', function() {
		    	expect(context.sampleRate).least(22050);
		    });

		    it('should have the attribute: sampleRate <= 96,000 sampe-frames/sec', function(){
		    	expect(context.sampleRate).to.be.at.most(96000);
		    });

		    it('should have the attribute: destination', function(){
		    	expect(context).to.have.ownProperty('destination');
		    });

		    it('should have the attribute: currentTime', function(){
		    	expect(context).to.have.ownProperty('currentTime');
		    });

		    it('should have the attribute: listener', function(){
		    	expect(context).to.have.ownProperty('listener');
		    });

			it('should have the attribute: activeSourceCount ', function(){
				// specified in change log dated Tue Apr 11 2012
		    	expect(context).to.have.ownProperty('activeSourceCount');
		    });	    
	  	});

	  	describe('methods', function(){
			it('should have the method: createBuffer()', function(){
				expect(context.createBuffer).to.be.a('Function');
			});

			it('should have the method: decodeAudioData()', function(){
				expect(context.decodeAudioData).to.be.a('Function');
			});

			it('should have the method: createBufferSource()', function(){
				expect(context.createBufferSource).to.be.a('Function');
			});

			it('should have the method: createMediaElementSource()', function(){
				expect(context.createMediaElementSource).to.be.a('Function');
			});

			it('should have the method: createMediaStreamSource()', function(){
				expect(context.createMediaStreamSource).to.be.a('Function');
			});

			it('should have the method: createMediaStreamDestination()', function(){
				expect(context.createMediaStreamDestination).to.be.a('Function');
			});

			it('should have the method: createScriptProcessor()', function(){
				// depreciated name: createJavaScriptNode()
				expect(context.createScriptProcessor).to.be.a('Function');
			});

			it('should have the method: createAnalyser()', function(){
				expect(context.createAnalyser).to.be.a('Function');
			});

			it('should have the method: createGain()', function(){
				// depreciated name: createGainNode()
				expect(context.createGain).to.be.a('Function');
			});

			it('should have the method: createDelay()', function(){
				// depreciated name: createDelayNode()
				expect(context.createDelay).to.be.a('Function');
			});

			it('should have the method: createBiquadFilter()', function(){
				expect(context.createBiquadFilter).to.be.a('Function');
			});

			it('should have the method: createWaveShaper()', function(){
				expect(context.createWaveShaper).to.be.a('Function');
			});

			it('should have the method: createPanner()', function(){
				expect(context.createPanner).to.be.a('Function');
			});

			it('should have the method: createConvolver()', function(){
				expect(context.createConvolver).to.be.a('Function');
			});

			it('should have the method: createChannelSplitter()', function(){
				expect(context.createChannelSplitter).to.be.a('Function');
			});

			it('should have the method: createChannelMerger()', function(){
				expect(context.createChannelMerger).to.be.a('Function');
			});

			it('should have the method: createDynamicsCompressor()', function(){
				expect(context.createDynamicsCompressor).to.be.a('Function');
			});

			it('should have the method: createOscillator()', function(){
				expect(context.createOscillator).to.be.a('Function');
			});

			it('should have the method: createWaveTable()', function(){
				expect(context.createWaveTable).to.be.a('Function');
			});

	  	});
  	}
  }); //describe

}); //define
