define(function(){

	/**
	* @param {String} path
	* @param {String} type - most probably "audiobuffer" for our uses
	* @param {Function} callback
	* @todo This is a very simple implementation for demostration
	*/
	function get(path, type, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', path, true);
		xhr.responseType = type;

		xhr.onload = function() {
			var err;
			if (this.status !== 200) {
				err = Error('http error: ', this.status, this.statusText);
			}
			callback(err, xhr.response);
		};

		xhr.send();
	}

	return {
		get: get
	};

});