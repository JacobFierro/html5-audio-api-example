define(function(){

	function getBuffer(url, callback) {
		$.ajax({
			url: '/src/sounds/' + url + '.mp3',
			dataType: "arraybuffer"
		}).done(function(data){
			debugger;
			callback(null, data);
		});
	}

	return {
		getBuffer : getBuffer
	};

});