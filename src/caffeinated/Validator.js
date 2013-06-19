!function($) {

	$.fn.validate = function(options) {

		//var settings = $.extend({}, $.fn.form.defaults, options)

		var result = new Array()
		this.each(function() {
			var validator = new Validator(options)
			result.push(validator.validate($(this)))
		})

		return result.length == 1 ? result[0] : result
		//return result

	}

	Validator = function(options) {

		this.options = options

	}

	Validator.prototype = {

		validate: function(dom) {
			
			var results = new cafe.ValidateResult()
			
			for (var validatorName in this.options) {
				var validatorFunc = this[validatorName]
				if (validatorFunc == undefined) {
					console.error("ERROR: Undefined Validator - " + validatorName)
					results.putResult(new cafe.ValidateResult(false, "validator.info.undefined", {
						"name": validatorName
					}))
					continue
				}
				//var result = validatorFunc(dom.val(), this.options)
				results.putResult(validatorFunc(dom.val(), this.options))
			}
			return results
		}

		, length: function(val, options) {
			//return (val.toString().length == options.length) ? {result:true} : {result:false, info:"validator.length"}
			return new cafe.ValidateResult((val.toString().length == options.length), "validator.info.length", {
				"length": options["length"]
			})
		}

		, minLength: function(val, options) {
			//return (val.toString().length >= options.minLength) ? {result:true} : {result:false, info:"validator.minLength"}
			return new cafe.ValidateResult((val.toString().length >= options.minLength), options.minLength > 1 ? "validator.info.minLength" : "validator.info.notnull", {
				"minLength": options["minLength"]
			})
		}

		, maxLength: function(val, options) {
			//return (val.toString().length <= options.maxLength) ? {result:true} : {result:false, info:"validataor.maxLength"}
			return new cafe.ValidateResult((val.toString().length <= options.maxLength), "validator.info.maxLength", {
				"maxLength": options["maxLength"]
			})
		}

		, number: function(val, options) {
			if (val == null || val == undefined || val == "") {
				return new cafe.ValidateResult(true, "validator.info.number", {
					"number": true
				})
			}
			return new cafe.ValidateResult(/[1-9][0-9]*/.test(val), "validator.info.number", {
				"number": true
			})
		}

	}

	ValidateResult = function(result, info, params) {

		//this.class
		this.result = true
		this.results = {}
		this.info = {}
		this.params = {}

		if ((result !== undefined) && info) {
			this.result = this.result && result
			this.params = params
			
			for (var n in params) {
				this.results[n] = result
				this.info[n] = info.constructor === String ? info : info[n]
			}
		}

	}

	ValidateResult.prototype = {
		type: function() {
			return "cafe.ValidateResult"
		},
		putResult: function(result) {
			if (result.type() == "cafe.ValidateResult") {
				this.result = this.result && result.result
				//this.info = this.info.concat(result.info)
				//this.results = this.results.concat(result.results)
				for (var n in result.params) {
					this.results[n] = result.results[n]
					this.info[n] = result.info[n]
					this.params[n] = result.params[n]
				}
			}
		},
		
		/*
		removeResult: function(result) {
			//
		},
		//*/
		
		getInfo: function() {

			if (this.info.length < 1 || this.result) return

			var infoStr = ""
			for (var i in this.info) {
				if (!this.results[i]) {
					var str = cafe.Message.error[this.info[i]] == undefined ? this.info[i] : cafe.Message.error[this.info[i]]
					//var r = /\[\:[^\]]+\]/g
					//var r = new RegExp("\\[\\:[^\\]]+\\]","g")
					for (var n in this.params) {
						var r = new RegExp("\\[\\:" + n + "\\]", "g")
						str = str.replace(r, this.params[n])
					}
					infoStr += (str + ", ")
				}
			}

			return infoStr.substring(0, infoStr.length - 2)

		},
		getInfos: function() {

		},
		result: function() {

		},
		results: function() {

		}
	}

	cafe.ValidateResult = ValidateResult
	cafe.Validator = Validator
	
}(window.jQuery, window.cafe)