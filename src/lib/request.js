define(function(){

	function getBuffer(url, callback) {
		$.ajax({
			url: '/src/sounds/' + url + '.mp3',
			dataType: "arraybuffer"
		}).done(function(buffer){
			var err;
			if (buffer === undefined) err = Error('No data was returned for request /src/sounds/'+url+'.mp3');
			callback(err, buffer);
		});
	}

	return {
		getBuffer : getBuffer
	};

});