define(function(){
	return {
		isBuffer : function(buffer){
			return toString.call(buffer) === "[object AudioBuffer]";
		}
	}
})