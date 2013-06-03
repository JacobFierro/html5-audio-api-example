define(['lib/http'], function(http){
	/*
	 - Request.get() should exist
	 - get() should take a callback
	 - callback should pass a buffer
	*/

	describe('http', function() {

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

		describe('#get', function(){
			var path = "/src/sounds/piano.mp3",
				type = "arraybuffer";

			it('makes a GET http request', function(done) {
				http.get("/src/sounds/piano.mp3", type, sinon.spy());
			    expect(requests.length).to.equal(1);
			    done();
			});

			it('accepts the file path as the first argument', function(done){
				http.get(path, '', sinon.spy());
			    expect(requests[0].url).to.equal("/src/sounds/piano.mp3");
			    done();
			});

			it('accepts the response type as the second argument', function(done){
				http.get('', "json", sinon.spy());
			    expect(requests[0].responseType).to.equal("json");
			    done();
			});

			it('calls the callback', function(done){
				var callback = sinon.spy();
				http.get(path, type, callback);
				requests[0].onload(); // trigger the onload event

				expect(callback.calledOnce).to.be.true;
				done();
			});

			it('passes an error if status !== 200', function(done) {
				var callback = sinon.spy();
				http.get(path, type, callback);
				requests[0].onload(); // trigger the onload event

				expect(callback.args[0]).to.not.be.undefined;
				done();
			});

			// need to test xhr.response, not xhr.responseText
			xit('passes the responseText to the callback', function(done) {
				var callback = sinon.spy();
				http.get(path, type, callback);
				requests[0].respond(200, {}, 'OK');
				expect(callback.args[0][1]).to.be.equal('OK');
				done();
			});
		});





	}); // describe 'http'
});