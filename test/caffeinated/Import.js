$(function() {

	module('Caffeinated "Import" function test	')

		test("should provide no conflict", function(){
			var _import = $.fn.import.noConflict()
			ok(!$.fn.import, "import was set back to undefined (org value)")
			$.fn.import = _import
		})

		test("should be define on jquery object", function(){
			ok($(document.body).import, 'import method is define')
		})

		test("should add script tag into head tag", function() {
			var $test = $('<div/>')
				, count = $("head > script").length

				$test.import({
					'src'	: "./Import.toBeImport.js"
				})

				equal($("head > script").length, count + 1, 'added script tag into head tag')

				$("head > script:last").remove()
		})

		test("should put attribute named id", function() {
			var $head = $("head")
				, $test = $('<div/>')
				, count = $("head > script").length
				, expect = (
						$("head").html()
						+ '<script type="text/javascript" src="./Import.toBeImport.js"></script>'
					).replace(/\>\s+\</g, '')

				$test.import({
					'src'	: "./Import.toBeImport.js"
				})

				var $script = $("head > script:last")
				equal($script.attr("id"), undefined, 'put id with nothing')
				htmlEqual($script[0].outerHTML, '<script type="text/javascript" src="./Import.toBeImport.js"></script>')
				
		})
})