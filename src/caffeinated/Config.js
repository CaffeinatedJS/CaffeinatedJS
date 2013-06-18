/*
 * Core Config Version 2.0
 */

!function(cafe) {

	cafe.Config = {};
	
	cafe.Config.global = {
		ui_bases	: {
			"bs:button"	: "button",
			"bs:list"	: "ul",
			"bs:label"	: "label",
			"bs:chkbox"	: "label",
			"bs:radio"	: "label",
			"bs:list"	: "ul",
			"bs:item"	: "li",
			"bs:divider": "li",
			"bs:datepicker": "input",
			"bs:grid"	: "table",
			"bs:select" : "select",
			"bs:option" : "option"
		},
		//
		encode			: "utf-8",
		debug			: "false",
		theme			: "default",
		welcome_page	: "index.xml",
		//
		lib_path		: "scripts/",
		plugins_path	: "scripts/",
		themes_path		: "themes/",
		core_path		: "cafe-core.js",
		jquery_path		: "jquery.js"
		
	};
	
	
	
	
}(window.cafe)