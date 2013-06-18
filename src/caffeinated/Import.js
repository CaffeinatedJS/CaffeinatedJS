!function($) {
	
	var _import = $.fn.import

	$.fn.import = function(option) {
		return this.each(function() {
			var $this = $(this)
				, options = $.extend({}, this.defaults, option)
				, dom = document.createElement('script')

			dom.setAttribute('type', 'text/javascript')
			dom.setAttribute('src', options.src)
			if(options.id) dom.setAttribute('id', options.id)
				
			
			document.getElementsByTagName('head')[0].appendChild(dom);
		})
	}

	$.fn.import.defaults = {}

	$.fn.import.noConflict = function() {
		$.fn.import = _import
		return this
	}
	
}(window.jQuery)