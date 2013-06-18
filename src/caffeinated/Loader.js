!function (window, undefined) {

	var   _Caffeinated	= window.Caffeinated
		, _cafe			= window.cafe
		, Caffeinated	= cafe = {}

	Caffeinated.noConflict = function(deep) {
		
		if(window.cafe === Caffeinated)
			window.cafe = _cafe
		
		if(deep && window.Caffeinated === Caffeinated)
			window.Caffeinated = _Caffeinated

		return Caffeinated
	}


	cafe.makeUUID = function() {
		var S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}

	/*
	 *	Object extend Support
	 *	Copied from jQuery Source Code(v1.7.2)
	 */
	cafe.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}
	
		// extend jQuery itself if only one argument is passed
		if ( length === i ) {
			target = this;
			--i;
		}
	
		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	}

	cafe.config = function(options) {
		this.options = options
	}

	/*
	 * for IE
	 */
	if (!window.console) 
		console = {
			log		: function(str) {},
			info	: function(str) {},
			error	: function(str) {}
		}

	var Logger = function(debug, console, isChrome) {
		this.debug = debug
		this.console = console || window.console
		this.isChrome = isChrome
		this.divider = isChrome
				? "--------------------------------------------------"
				: "-----------------------------------------------------------------"
		//this.level = level || 'error'
	}
	
	Logger.prototype = {

		info	: function() {
			if(this.debug) {
				arguments[0] = arguments[0].replace(/\={5}/g, this.divider)
				//arguments[0] ='23'
				if(this.isChrome) this.console.info.apply(this.console, arguments)
				else this.console.info(arguments[0].replace(/\%./g, ""))
			}
		}

		, error	: function() {
			if(this.debug) {
				arguments[0].replace(/\={5}/, this.divider)
				if(this.isChrome) this.console.error.apply(this.console, arguments)
				else this.console.error(arguments[0].replace(/\%./g, ""))
			}
		}

	}

	var _this = document.getElementById('cafe-loader') || document.scripts[0]
		, config_path = _this.getAttribute('data-config') || 'cafe-config.js'
		, debug_in_cafe = _this.getAttribute('data-debug') === 'true' ? true : false
		, isChrome = /chrome/.test(window.navigator.userAgent.toLowerCase())
		, logger = cafe.logger = new Logger(debug_in_cafe, window.console, isChrome)

	/*
	 *	Caffeinated Context
	 */
	Context = function() {
		this.jobs	= new cafe.JobQueue(this);
		this.loader = new cafe.Loader();
		//this.stack = {};//???
	};
	
	Context.prototype = {
	
		init 			: function() {
			
			var loader = this.loader
				, jobs = this.jobs

			this.loadConfigJobs(jobs, loader)
			//this.loadDependencesJobs(jobs, loader)

			this.jobs.start()
			//this.initRuntime();
			
		}

		, loadConfigJobs	: function(jobs, loader) {

			this.isdebug = debug_in_cafe
			
			jobs.add(new cafe.AsyncJob(function(context) {
				loader.loadScripts(config_path, this)
			}, "load config define"))

			jobs.add(new cafe.SerialJob(function(context) {
				context.options = cafe.extend(context.defaults, cafe.options);
				context.options.debug = context.isdebug
			}, "configrate context options"))
		}

		, loadDependencesJobs: function(jobs, loader) {

			jobs.add(new cafe.AsyncJob(function(context) {
				var options = context.options
				loader.loadScripts([options.lib_path + options.core_path])
				loader.loadScripts(
					[(options.themes_path + options.theme + "/theme.js")]
					, this)
			}, "load basic dependences"))

		}

		, loadThemesAndPluginsJobs: function(jobs, loader) {

			
		}
		
		, initRuntime		: function() {
			
			
			var loader = this.loader
				, config_path = this.config_path

			this.jobs.add(new cafe.AsyncJob(function(context) {
				console.log("Loading global config file......");
				this.info = "加载全局配置文件";
				loader.loadScripts(config_path, this.callback);
			}));
			
			//Init Global Config
			this.jobs.add(new cafe.SerialJob(function(context) {
				console.log("Loading context config......");
				UIContext.options = cafe.extend(cafe.Config.global, cafe.config);
			}));
			
			this.jobs.add(new cafe.AsyncJob(function(context) {
				console.log("Loading jQuery Library......");
				loader.loadScripts(UIContext.options.plugins_path + UIContext.options.jquery_path, this.callback);
			}));
			
			//Dependence Load Job(DLJ)
			var dlj = new cafe.ParallelJob();
			dlj.init = function() {
				console.log("Loading basic dependences......");
				/*
				for(var n in loader.scripts) {
					(function(url, jobs, callback, loader) {
						jobs.push(new cafe.AsyncJob(function(){
							loader.loadScripts([url], callback);
						}));
					})(loader.scripts[n], this.jobs, this.callback, UIContext.loader);
				}
				//*/
				
				this.jobs.push(new cafe.AsyncJob(function() {
					var options = UIContext.options;
					loader.loadScripts([options.lib_path + options.core_path]);
					loader.loadScripts(
						[(options.themes_path + options.theme + "/theme.js")]
						, this.callback);
				}));
			};
			
			this.jobs.add(dlj);
			
			
			//Theme and Plug－ins Load Job
			var tnplj = new cafe.ParallelJob();
			tnplj.init = function() {
				
				console.log("Loading Theme and Plug-ins......");
				var options = UIContext.options;
				var theme = cafe.Config.currentTheme;
				
				for(var n in theme.style_sheets) {
					(function(url, options, jobs, callback, loader) {
						jobs.push(new cafe.AsyncJob(function() {
							loader.loadCssFiles(
								options.themes_path + options.theme + "/" + url
								, callback
							);
						}));
					})(theme.style_sheets[n], options, this.jobs, this.callback, UIContext.loader);
				}
				
				for(var n in theme.scripts) {
					(function(url, options, jobs, callback, loader) {
						jobs.push(new cafe.AsyncJob(function() {
							loader.loadScripts(
								options.themes_path + options.theme + "/" + url
								, callback
							);
						}));
					})(theme.scripts[n], options, this.jobs, this.callback, UIContext.loader);
				}
				
				for(var n in options.plugins) {
					(function(url, options, jobs, callback, loader) {
						jobs.push(new cafe.AsyncJob(function() {
							loader.loadScripts(
								url.indexOf("http://") == 0 ? url : options.plugins_path + url
								, callback
							);
						}));
					})(options.plugins[n], options, this.jobs, this.callback, UIContext.loader);
				}
			}
			
			this.jobs.add(tnplj);
			
			//Init MainView
			this.jobs.add(new cafe.SerialJob(function() {
				console.log("Start Render initializing......");
				var render = new cafe.Render();
				
				UIContext.viewManager = new cafe.ViewManager(render);
				UIContext.initMainView();
			}));
			
			
			//Start Job Scheduling
			this.jobs.start();
		},
		
		
		
		finishJob		: function(id) {
			this.jobs.finish(id);
			//console.log("finish job " + id);
		},
		
		getUIControl	: function(selector) {
			var controls = this.viewManager.views;
			var ctl;
			for(var v in controls) {
				for(var c in controls[v]) {
					if(c == selector) { 
						ctl = controls[v][c].api == undefined ? controls[v][c] : controls[v][c].api;
						break;
					}
				}
				if(ctl != undefined) break;
			}
			return ctl;
		}
		
	};
	
	
	/*
	 *	ICUI Context Job Scheduling
	 */
	cafe.JobQueue = function(context) {
		//console.log("Start jobs queue initializing......");
		this.queue		= []
		this.jobs		= {}
		this.isWorking	= false
		this.context	= context

	};
	
	cafe.JobQueue.prototype = {
		
		start	: function() {

			if(this.isWorking) return;
			
			this.timestamp = new Date()
			logger.info(
				  "\n%cOK, let's do this!\t\t"
				  	+ this.timestamp.toLocaleString()
					+ "\n====="
				, "font-weight:bold;"
			)

			var context = this.context
				, job = this.next()

			if(job) {
				logger.info(
					  "%c\u2193 %cProcessing: %c"
						+ (job.desc || job.id)
					, "font-weight:bold;color:#0000FF"
					, "font-weight:bold;color:#333"
					, "font-weight:normal;color:#333")
				job.process(context);
				this.isWorking = true;
			}// else console.log("Jobs clean!");

		},
		
		add		: function(job) {
			
			job.queue = this

			this.queue.push(job.id);
			this.jobs[job.id] = job;
			this.isEmpty = false;

		},
		
		hasNext	: function() {
			return this.queue.length > 0;
		},
		
		next	: function() {
			return this.jobs[this.queue[0]];
		},
		
		finish	: function(id) {

			//I dont know why!!!
			if(this.jobs[id] == undefined && /(msie) ([\w.]+)/.test(window.navigator.userAgent.toLowerCase())) return;
			
			if(this.jobs[id].isDone()) {
				
				logger.info(
					  "%c\u2714 %cComplete\t: %c"
						+ this.jobs[id].desc
					, "font-weight:bold;color:#00A600"
					, "font-weight:bold;color:#333"
					, "font-weight:normal;color:#333");

				delete this.jobs[id];
				this.queue.shift();
				//UIContext.start();
				//this.isEmpty = this.jobs.length > 0
				
				var job = this.next()

				if(job) {
					logger.info(
						  "%c\u2193 %cProcessing: %c"
							+ (job.desc || job.id)
						, "font-weight:bold;color:#0000FF"
						, "font-weight:bold;color:#333"
						, "font-weight:normal;color:#333")
					job.process(this.context)
				} else {
					this.isWorking = false;
					
					var timestamp = new Date()
					logger.info(
						  "%c=====\n"
							+ "Great, jobs queue has been clean!\n"
							+ "Total : "
							+ (timestamp.getTime() - this.timestamp.getTime()) / 1000
							+ "sec\t\t"
							+ timestamp.toLocaleString()
						, "font-weight:bold;"
					)
				}
			}
		}
		
	};
	
	cafe.SerialJob = function(job, desc) {
		
		this.job	= job
		this.desc	= desc
		this.id		= cafe.makeUUID()
		this.stat	= "sleep"
	
	}
	
	cafe.SerialJob.prototype = {

		process	: function(context) {

			this.stat = "active";
			
			this.job(context);
			this.stat = "done"

			this.queue.finish(this.id);
			
		}
		
		, done	: function() {
			return this.stat == "done";
		}
		
		, isDone	: function() {
			return this.stat == "done";
		}
	};
	
	cafe.AsyncJob = function(job, desc) {
		
		var id	= this.id = cafe.makeUUID()

		this.job	= job;
		this.desc	= desc
		this.stat	= "sleep";
		
		/*
		this.callback = function() {
			UIContext.finishJob(id);
		}
		//*/

	};
	
	cafe.AsyncJob.prototype = {

		process	: function(context) {
			
			this.stat = "active"
			this.job(context)

		}

		, done		: function() {

			this.stat = "done"
			this.queue.finish(this.id)

		}

		, isDone	: function() {
			return this.stat == "done";
		}

	}
	
	cafe.ParallelJob = function(jobs) {
		if(jobs && jobs instanceof Array)
			this.jobs = jobs;
		else
			this.jobs = [];
		this.id = cafe.makeUUID();
		this.stat = "sleep";
		this.threads = 0;
		var id = this.id;
		this.callback = function() {
			UIContext.finishJob(id);
		}
	};
	
	cafe.ParallelJob.prototype = {
		process	: function() {
			this.stat = "active";
			
			if(this.init) this.init();
			this.threads = this.jobs.length;
			var id = this.id, jobs = this.jobs;
			for(var i = 0; i < jobs.length; ++i) {
				var tid = jobs[i].id;
				jobs[i].callback = function() {
					UIContext.finishJob(id, tid);
				};
				jobs[i].process();
			}
		},
		
		done	: function() {
			//this.stat = "done";
			return (--this.threads) == 0;
		},
		
		isDone	: function() {
			return this.stat == "done";
		}
	};
	
	
	/*
	 *	Core Loader Version 1.1
	 */
	cafe.Loader = function () {
	
		//console.log("Start core loader initializing......");
		
		this.scripts = {
			"cafe-core"	: "scripts/cafe-core.js"
		};
		
		this.browser = {
			ie: /(msie) ([\w.]+)/.test(window.navigator.userAgent.toLowerCase()),
			moz: /(mozilla)(?:.*? rv:([\w.]+))?/.test(window.navigator.userAgent.toLowerCase()),
			opera: /(opera)(?:.*version)?[ \/]([\w.]+)/.test(window.navigator.userAgent.toLowerCase()),
			webkit: /(webkit)[ \/]([\w.]+)/.test(window.navigator.userAgent.toLowerCase())
		};
		
	};
	
	cafe.Loader.prototype = {
		
		hasFile	: function (tag, url) {
		
			var contains = false;
			var files = document.getElementsByTagName(tag);
			var type = tag == "script" ? "src" : "href";
			for (var i = 0, len = files.length; i < len; i++) {
				if (files[i].getAttribute(type) == url) {
					contains = true;
					break;
				}
			}
			
			return contains;
		}

		, fileExt	: function(url) {
			var att = url.split('.');
			var ext = att[att.length - 1].toLowerCase();
			return ext;
		}

		, loadFile:function(element, context, parent) {
			var p = parent && parent != undefined ? parent : "head";
			try {
				document.getElementsByTagName(p)[0].appendChild(element);
			} catch(e) {
				console.log(e)
			}
			if (context && context.done) {
				//MS IE
				if (this.browser.ie) {
					element.onreadystatechange = function () {
						if (this.readyState == 'loaded' || this.readyState == 'complete') {
							context.done();
						}
					};
				//Webkit Opera
				} else if (this.browser.webkit || this.browser.opera) {
					element.onload = function () {
						context.done();
					};
				//Mozilla
				} else if (this.browser.moz) {
					element.onload = function () {
						context.done();
					};
				} else {
					context.done();
				}
			}
		}

		, loadCssFiles	: function(files, context) {
			var urls = files && typeof (files) == "string" ? [files] : files;
			for (var i = 0, len = urls.length; i < len; i++) {
				var cssFile = document.createElement("link");
				cssFile.setAttribute('type', 'text/css');
				cssFile.setAttribute('rel', 'stylesheet');
				cssFile.setAttribute('href', urls[i]);
				if (!this.hasFile("link", urls[i])) {
					this.loadFile(cssFile, context);
				}
			}
		}

		, loadScripts : function(files, context, parent) {
			var urls = files && typeof (files) == "string" ? [files] : files;
			for (var i = 0, len = urls.length; i < len; i++) {
				var script = document.createElement("script");
				script.setAttribute('charset', 'utf-8');
				script.setAttribute('type', 'text/javascript');
				script.setAttribute('src', urls[i]);
				if (!this.hasFile("script", urls[i])) {
					this.loadFile(script, context, parent);
				}
			}
		}
		
	};
	
	

	
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Caffeinated = window.cafe = cafe
		//window.I_AM_THE_REAL_CAFFEINATED_BITCH = cafe
	}
	
	var context = new Context();
	window.UIContext = context;
	
	context.init();

}(window, undefined);

