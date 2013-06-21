!function(window, undefined, $, UIContext) {

	$.fn.api = function() { return this.data("api") }
	
	cafe.ViewManager = function(render) {
	
		this.render = render;
		this.views = {};
		this.rendjobids = [];
		
	};
	
	cafe.ViewManager.prototype = {
		
		load		: function(url, target, params, callback) {
			
			var _this = this
			
			UIContext.jobs.add(new cafe.AsyncJob(function() {
				
				_this.rendjobids.push(this.id);
				var targetName = target instanceof $ ? target.selector : target;
				if(_this.views[url + "@@" + targetName] != undefined) {
					delete _this.views[url + "@@" + targetName];
				}
				
				_this.views[url + "@@" + targetName] = { "_stack" : [] };
				var viewContext = _this.views[url + "@@" + targetName];
				
				
				//var _this = this;
				$.ajax({
					url		: url,
					dataType: "xml",
					success	: function(data) {
						_this.rend(data, target, _this.render, viewContext, params);
						if(callback) callback(data, target);
					},
					error	: function() {
						console.log("Load resource Failed: " + url);
						UIContext.jobs.finish(_this.rendjobids.pop());
					}
				});
				
			}));
			
			UIContext.jobs.start();
			
		},
		
		loads		: function(url, target, params, callback) {
			var params = url.replace(/^\#(\?)?/, "").split("\&")
			
			if(params instanceof Array && params.length > 0) {
				//var args = {}
				for(var i = 0; i < params.length; ++i) {
					var p = params[i].split("=");
					if(p.length > 1)
						UIContext.viewManager.load(p[1], ".bs_" + p[0])
				}
				
				
			}
		},
		
		unload		: function(url, target, callback) {
			
		},
		
		rend		: function(dom, target, render, viewContext, params) {
			//var viewContext = { "_stack" : [] };
			var html = render.rend(dom, viewContext);
			var tag = target == undefined ? 
				$("body")
				: (target.constructor == String ? $(target) : target);
				
			tag.html("").html(html);
			//TODO More Test on inner-block Elements spaces
			html.find(".ui_case").each(function () {
				var c = $(this).children(":not([class~='case_source_code'])")
				c.wrapAll("<div class='ui_case_show'></div>")
			})
			$(tag.selector + " *").after("\n");
			
			if(tag.hasClass("ui_include")) {
				html.unwrap();
			}
			
			if(html.hasClass("ui_application")) {
				html.unwrap();
			}

			cafe.session = cafe.session || {permissions: []}
			if(hasCookieItem("pms"))
				cafe.session.permissions = eval("['" + getCookieItem("pms").replace(/\,/g , "','") + "']")

			for(var i = 0; i < viewContext._stack.length; ++i) {
				//console.log(i + "\t - " + viewContext["_stack"][i].id)
				var id = viewContext["_stack"][i].id
					, ns = viewContext["_stack"][i].name.split(":")[0]
					, name = viewContext["_stack"][i].name.split(":")[1]
					, options = viewContext[id]
					, required = options.required
					, isBeforeLogin = options.beforeLogin
				
				if(required)
					if($.inArray(required, cafe.session.permissions) < 0) {
						$("#" + id).remove()
						continue
					}
				if(isBeforeLogin && hasCookieItem("pms")) {
					$("#" + id).remove()
					continue
				}

				for(var n in options) {
					if(n == "id" || n == "name") continue;
					options[n] = window[options[n]] ? window[options[n]] : options[n];
				}
				
				if($.fn[name]) {
					eval('$("#" + id).' + name + '(options)');
				} else {
					console.error("$.fn." + name + " is undefined!");
				}
			}
			
			if(viewContext[html.attr("id")].init != undefined) {
				viewContext[html.attr("id")].init(params);
			}
			
			if($.browser.msie) window.prettyPrint = prettyPrint || {}
			if(prettyPrint.constructor == Function) prettyPrint();
			
			$("option:not([value])").val("")
			
			UIContext.jobs.finish(this.rendjobids.pop())
		}
		
	};
	
	cafe.URL = function(url, method, data) {
		this.url = url;
		this.method = method;
		this.data = data;
	}
	
	UIContext.initMainView = function() {
		
		var welcome_page = UIContext.options.welcome_page;
		UIContext.viewManager.load(welcome_page);
		
	};
	
	cafe.Render = function() {
		//this.context = context;
		this.viewIdSequence = {};
		this.ids = {};
	};
	
	cafe.Render.prototype = {
	
		rend		: function(xml, context) {
			
			var dom = {};
			this._XMLParse(dom, xml.lastChild);
			var html = this._HTMLGenerate(dom, context);
			return html;
			
		},
		
		_XMLParse	: function(node, dom) {
	
			//Get XML Node Type in different browser
			var getNodeType = function(dom) {
				return (dom.nodeName.indexOf("#") == 0) ?
					  (dom.nodeName.substring(1,2).toUpperCase() + dom.nodeName.substring(2))
					: ("Element");
			}
			
			
			//Parse Parent Node
			node.type = getNodeType(dom);
				
			if(node.type == "Element") {
				
				node.attributes = {};
				for(var i = 0; i < dom.attributes.length; ++i) {
					node.attributes[dom.attributes[i].name] = 
						dom.attributes[i].value;
				}
				
				if(dom.nodeName == "ui:case") {
					var doc = $.browser.msie ? new ActiveXObject("Microsoft.XMLDOM") : document;
					var pre = doc.createElement("pre")
					//$(pre).addClass("prettyprint linenums lang-xml case_source_code")
					pre.setAttribute("class", "prettyprint linenums lang-xml case_source_code")
					
					var code = "";
					for(var i = 0; i < dom.childNodes.length; ++i) {
						var et = $.browser.msie ? dom.childNodes[i].xml : new XMLSerializer().serializeToString(dom.childNodes[i])
						code += (et == "\n" ? "" : et)
					}
					
					code = code.replace(/ xmlns:\w+="[^"]+"/g, "");
					
					var code_beautifier = typeof style_html == 'function' && style_html;
					
					if(code_beautifier) {
						var options = {
							brace_style				: "expand",
							indent_char				: " ",
							indent_scripts			: "normal",
							indent_size				: "4",
							keep_array_indentation	: false,
							preserve_newlines		: true,
							space_after_anon_function: true,
							space_before_conditional: true,
							unescape_strings		: true
						}
						code = code_beautifier(code, options);
					}
					//console.log(code);
					code = code.replace(/</g, "&lt;");
					code = code.replace(/>/g, "&gt;");
					
					pre.appendChild(doc.createTextNode(code))
					dom.appendChild(pre)
				}
			
			} else if(node.type == "Text") {
				node.text = $.trim($.browser.msie ? dom.text : dom.textContent);
			} else if(node.type == "Cdata-section") {
				node.text = dom.data;
			} else return;
				
			node.name = dom.nodeName;
			
			
			//Parse Child Node
			if(dom.childNodes.length > 0) {
				
				node.childs = [];
				
				for(var i = 0; i < dom.childNodes.length; ++i) {
					
					var child = dom.childNodes[i];
					
					if(getNodeType(child) == "Text"
						&& $.trim($.browser.msie ? dom.text : dom.textContent) == ""
						|| getNodeType(child) == "Comment")
							continue;
						
					var n = {}
					node.childs.push(n)
					this._XMLParse(n, child);
					
				}
			}
			
		},
		
		_HTMLGenerate	: function(dom, context) {
			
			var node;
			var _this = this;
			
			//Generate One HTML DOM Node
			var gen = function(dom) {
				
				if(!dom.attributes.id && dom.name.split(":").length > 1)
					dom.attributes.id = _this._genId(dom.name);
				
				//var uibase = dom.attributes["ui:base"] == undefined ? "div" : dom.attributes["ui:base"];
				var uibase = UIContext.options["ui_bases"][dom.name] == undefined ? "div" : UIContext.options["ui_bases"][dom.name];
				
				if(dom.attributes["ui:base"]) {
					uibase = dom.attributes["ui:base"];
				}
				
				
				var node = dom.name.indexOf("script") != -1 ?
					  $('<script type="text/javascript"></script>')
					: (dom.name.indexOf("\:") != -1 ? 
						  $("<" + uibase + " class=\"" + dom.name.replace(":", "_") + "\"/>")
						: $("<" + dom.name + " />"));
				
				var attrs = {};
				for(var n in dom.attributes) {
					//TODO number parse
					var attrValue = dom.attributes[n];
					
					if(attrValue.search(/^-?\d+(\.\d+)?$/) == 0) {
						attrs[n] = (attrValue.indexOf(".") != -1 ? parseFloat(attrValue) : parseInt(attrValue));
					} else if(attrValue == "true") {
						attrs[n] = true;
					} else if(attrValue == "false") {
						attrs[n] = false;
					} else {
						attrs[n] = attrValue;
					}
					var v = node.attr(getHtmlAttrName(n)) ? $.trim(node.attr(getHtmlAttrName(n))) + " " + $.trim(attrValue) : attrValue;
					node.attr(getHtmlAttrName(n), v);
				}
				//node.attr(attrs);
				
				if(dom.name.indexOf(":") != -1) {
					var id = dom.attributes.id;
					context[id] = $.extend({}, attrs);
					context["_stack"].unshift({name: dom.name, id: id});
				}
				
				return node;
			}
			
			
			//Convert XML Attribute Name to HTML Attribute Name(Ignore Case)
			var getHtmlAttrName = function(name) {
				return name.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/g, "_");
			}
			
			
			//Traversal DOM Nodes
			if(dom.childs != undefined) {
			
				//Process Script Node
				
				/* CaffeinatedJS change begin */
				
				/* 
				
				// Original code
				
				if(dom.name.indexOf("script") != -1 
									&& dom.childs.length == 1
									&& dom.childs[0].type == "Text") {
								
				
				//*/
				
				//*
				
				// New!
				var scriptTestReg = new RegExp("^([a-zA-Z]+\:)?script$", "g")
				if(scriptTestReg.test(dom.name)) {
				
				//*/
				
				/* CaffeinatedJS change end */
					
					if($.browser.msie)
						for(var i = 0; i < dom.childs.length; ++i) window.execScript(dom.childs[i].text);
					else
						for(var i = 0; i < dom.childs.length; ++i) window.eval(dom.childs[i].text);
					
					return;
				}
				
				node = gen(dom);
				
				for(var i = 0; i < dom.childs.length; ++i) {
					node.append(_this._HTMLGenerate(dom.childs[i], context));
				}
				
			} else {
				
				if(dom.type == "Element") {
					
					node = gen(dom);
					
				} else if(dom.type == "Text") {
					node = dom.text;
				}
				
			}
			
			return node;
			
		},
		
		_genId			: function(name) {
			var nname = name.replace(":", "_");
			if(!this.ids[nname]) this.ids[nname] = 0;
			
			return "gen_" + nname + "_" + (++this.ids[nname]);
		}
		
	};
	
	
	
}(window, undefined, window.jQuery, window.UIContext)

/*
 *	Name	: include
 *	Desc	: 引用
 */
!function ($) {
	
	window.getCookieItem = function(key) {
		if (!key || !hasCookieItem(key)) { return null; }
		return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
	}

	window.setCookieItem = function(key, val, end, path, domain, secure) {
		if (!key || /^(?:expires|max\-age|path|domain|secure)$/.test(key)) { return; }
		var sExpires = "";
		if (end) {
			switch (typeof end) {
				case "number": sExpires = "; max-age=" + end; break;
				case "string": sExpires = "; expires=" + end; break;
				case "object": if (end.hasOwnProperty("toGMTString")) { sExpires = "; expires=" + end.toGMTString(); } break;
			}
		}
		document.cookie = escape(key) + "=" + escape(val) + sExpires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
	}

	window.removeCookieItem = function(key) {
		if (!key || !hasCookieItem(key)) { return; }
		var oExpDate = new Date();
		oExpDate.setDate(oExpDate.getDate() - 1);
		document.cookie = escape(key) + "=; expires=" + oExpDate.toGMTString() + "; path=/";
	}

	window.hasCookieItem = function(key) {
		return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	}

	$.fn.include = function (options) {
		
		var settings = $.extend({}, $.fn.include.defaults, options);
		var target = $(this);
		UIContext.viewManager.load(settings.src, target);
		
	};
	
	$.fn.include.defaults = {
		src	: "404.html"
	};
	
}(window.jQuery)