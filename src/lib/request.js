define(function(){

	/**
	* @param {String} fileName
	* @param {Function} callback
	* @todo This is a very simple implementation for demonstration purposes only
	*/
	function getBuffer(fileName, callback) {
		$.ajax({
			url: '/src/sounds/' + fileName + '.mp3',
			dataType: "arraybuffer"
		}).done(function(buffer){
			debugger;
			var err;
			if (buffer === undefined) err = Error('No data was returned for request /src/sounds/'+url+'.mp3');
			callback(err, buffer);
		});
	}

	return {
		getBuffer : getBuffer
	};

});