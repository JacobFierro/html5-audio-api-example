define(['lib/request'], function(request){
	/*
	 - Request.get() should exist
	 - get() should take a callback
	 - callback should pass a buffer
	*/

	describe('request', function() {

		var xhr, requests, server;

		beforeEach(function () {
			// fake xmlhttp
		    xhr = sinon.useFakeXMLHttpRequest();
		    requests = [];
		    xhr.onCreate = function (req) { requests.push(req); };
		});

		afterEach(function () {
			// important: clean up
		    xhr.restore();
		});

		describe('getBuffer', function(){
			it('makes a GET request', function(done) {
				request.getBuffer('piano', sinon.spy());
			    expect(requests.length).to.equal(1);
			    done();
			});

			it('builds the proper file path when given a file name', function(done){
				request.getBuffer('piano', sinon.spy());
			    expect(requests[0].url).to.equal("/src/sounds/piano.mp3");
			    done();
			});

			it('should call the callback', function(done){
				var callback = sinon.spy();
				request.getBuffer('piano', callback);
				requests[0].onload(); // trigger the onload event

				expect(callback.calledOnce).to.be.true;
				done();
			});
		});





	}); // describe 'request'
});