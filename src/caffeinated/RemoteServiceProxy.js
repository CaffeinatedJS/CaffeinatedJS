!function($) {

//	var baseURL;
	
	var RemoteServiceProxy = function(baseURL) {

		this.baseURL = baseURL
	};

	RemoteServiceProxy.prototype.invoke = function(func) {

			var paramNames = func.toString().split(/\n/)[0].split(/[^\w]+/);
			for (var i = 0; i < paramNames.length; ++i)
			if (paramNames[i] == "") delete paramNames[i]
			paramNames.shift();
			paramNames.shift();

			var remote = func.toString().split(/\n/)[0].split(/[^\w]+/)[1].split("_")[1]
				, invokeURL = this.baseURL + "/" + remote + ".json"
				, args = new Object()

			
			for (var i = 2; i < arguments.length; ++i) {

				var arg = arguments[i]
					, pn = paramNames[i - 2]
					, serialor = function(args, arg, pn) {
						pn.replace(/^[^\.]+\./, "") 
						if(arg instanceof Array) {
							for(var i in arg) {
								serialor(args, arg[i], pn + '[' + i + ']')
							};
						} else if(arg instanceof Object) {
							for(var n in arg) {
								serialor(args, arg[n], pn + '.' + n)
							};
						} else {
							args[pn] = arg
						}
					}

				serialor(args, arg, pn)

				/*
				if (typeof arguments[i] == "object") {
					for (var a in arguments[i]) {
						var pn = a.split(".");
						if (pn.length > 1 || a == "dom" || a == "error" || a == "success") pn.shift();
						args[paramNames[i - 2] + (pn.length > 0 ? ("." + pn.join(".")) : "")] = arguments[i][a];
					}
				} else {
					args[paramNames[i - 2]] = arguments[i];
				}
				//*/
			}

			var callback = {
				success	: function() {
					console.log("Access")
				}

				, error	: function(data) {
					
					alert(data.error)
				}
			}
			$.extend(callback, arguments[1])
			
			//*
			$.ajax({
				url: invokeURL,
				type: "POST",
				data: args,
				xhrFields: {
					withCredentials: true
				},
//				async: false,
				success: function(data) {
					
					var getRefVal = function(r, p) {
							var val = r
								, path = p.replace(/^\$\./, "").split(/\.|\]\.?|\[/)

							for(var index in path) {
								
								if(path[index] == "") continue;

								val = val[path[index]]
							}

							return val
						}
						, dataRebuild = function(n, r) {
							var node = n
								, root = (r ? r : n)

							for(var attr in node) {
								if(node[attr].constructor != Object && node[attr].constructor != Array) continue

								if(node[attr].hasOwnProperty('$ref')) {

									if(node[attr]['$ref'] == '..') { console.log(attr); continue; }
									if(node[attr]['$ref'] == '../..') { console.log(attr); continue; }

									var path = node[attr]['$ref'].replace(/^\$\./, "").split(/\.|\]\.?|\[/)
									node[attr] = root

									for(var index in path) {
										
										if(path[index] == "") continue;

										node[attr] = node[attr][path[index]]
									}

									//node[attr] = getRefVal(root, node[attr]['$ref'])
								} else {
									dataRebuild(node[attr], root)
								}
							}

						}

					//dataRebuild(data)

					if(data.error == "")
						callback.success(data, callback.dom)
					else {
						if(data.error == "authorization failed") data.error = "服务访问权限校验失败，当前用户无权访问此服务。"
//						removeCookieItem("pms")
						callback.error(data, callback.dom)
					}
					/*
					if (!callback || !callback.success || !callback.error) {
						return;
					}
					if
					if (data.error.length > 0) callback.error(data, callback.dom);
					else callback.success(data, callback.dom);
					//*/
				},
				error: function(data) {
					
					alert(JSON.stringify(data));
					
					/*
					if(callback.error[data.error] != undefined)
						callback.error[data.error](callback.dom);
					else
						console.log("");
					//*/
					if (!callback || !callback.success || !callback.error) {
						return;
					}
					callback.error(data, callback.dom);
				}
			});
			//*/
		}


	window.RemoteServiceProxy = RemoteServiceProxy
	
}(window.jQuery)