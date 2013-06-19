!function($, cafe) {

	$.fn.message = function(options) {
		var settings = $.extend({}, $.fn.message.defaults, options);

		return this.each(function() {

			var msg = new cafe.Message(settings, $(this));
			this.api = msg;
			var bind = $(this).attr("for");

			cafe._msgcontext = cafe._msgcontext || {};
			if (bind) cafe._msgcontext[bind] = msg;
			msg.rend();

		});
	}

	cafe.Message = function(options, dom) {
		this.undoOptions = options;
		this.options = options;
		this.dom = dom;
	};

	cafe.Message.prototype = {
		rend: function() {

			this.dom.removeClass("ui-state-error ui-state-highlight ui-corner-all");

			var className = "ui-state-" + this.options.type;

			this.dom.addClass(className);
			if (this.options.radius == true) this.dom.addClass("ui-corner-all");

			this.dom.html("");

			var p = $("<p/>");
			if (this.options.type == "error") p.append('<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>');
			else if (this.options.type == "" || this.options.type == undefined || this.options.type == null) p.append('<span class="ui-icon ui-icon-none" style="float: left; margin-right: .3em;"></span>');
			else p.append('<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>');

			p.append(this.options.value);

			this.dom.append(p);
		},

		refresh: function(options) {
			this.options = $.extend({}, $.fn.message.defaults, options);
			this.rend();

		},

		undo: function() {
			this.options = this.undoOptions;
			this.rend();
		}

	}

	cafe.Message.error = {
		"validator.info.undefined": "未找到数据验证策略：[:name]",
		"validator.info.notnull": "所填内容不能为空",
		"validator.info.length": "所填内容长度应当为[:length]个字符",
		"validator.info.minLength": "所填内容小于最小长度[:minLength]",
		"validator.info.maxLength": "所填内容大于最大长度[:maxLength]",
		"validator.info.number": "所填内容必须是数字"
	}


	$.fn.message.defaults = {

		type: "default",

		radius: true

	}
	
}(window.jQuery, window.cafe)