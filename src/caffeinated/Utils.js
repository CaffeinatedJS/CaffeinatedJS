/*
 *	UUID Generate Support
 *	The time it need to generate one UUID less than 1ms
 *	Copied from http://darkmasky.iteye.com/blog/906991, in the comments.
 */

!function(cafe) {
	
	cafe.makeUUID = function() {
		var S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}

}(window.cafe)