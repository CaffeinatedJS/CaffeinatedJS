$(function() {

	module('Caffeinated "Loader" function test	')
		
		test("should provide no conflict", function(){
			var _Caffeinated = window.Caffeinated.noConflict(true)
			ok(!window.Caffeinated && !window.cafe, "Caffeinated was set back to undefined (org value)")
			window.Caffeinated = window.cafe = _Caffeinated
		})

		/*
		/* TODO : Test cafe.makeUUID
		// I have no idea to test it;
		//*/

		test("cafe.extend should return new combo Object", function(){
			var obj_1 = {a:1, b:2, c:3}
				, obj_2 = {b:4, d:3}

			var combo = cafe.extend(obj_1, obj_2)

			ok(combo, "return new Object")
			deepEqual(combo, obj_1, "rewrite be comboed Object")
			deepEqual({a:1, b:4, c:3, d:3}, combo, "get the right resutl")
		})

		test("should get a defined console with any browser", function(){
			var console = window.console
			ok(console
				&& console.log
				&& console.info
				&& console.error, "the 'window.console' has been defined")
		})

		//test for init config
		test("should set new config", function() {
			var op = cafe.options
				, newop = {a: 1, b:4, c:7}

			cafe.config(newop)

			deepEqual(cafe.options, newop, "options have been set back")
			cafe.options = op
		})

		test("should have a logger to write logs", function() {

		})
		
})