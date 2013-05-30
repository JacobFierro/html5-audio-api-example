define(function(){

	var context = window.AudioContext||window.webkitAudioContext||undefined;

	return {
		getAudioContext : function(){
			if (!!context) {
				return new context;
			} else {
				throw Error('Web Audio API is not supported in this browser');
			}
		}
	}
});
