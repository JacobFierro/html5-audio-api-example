define(function(){

	var AudioContext = window.AudioContext||window.webkitAudioContext||undefined;

	var context = new AudioContext();

	return {
		getAudioContext : function(){
			if (!!context) {
				return context;
			} else {
				throw Error('Web Audio API is not supported in this browser');
			}
		},
		audioContext: context
	}
});
