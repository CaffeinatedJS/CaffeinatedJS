$(function() {
	
	function myFunc(rules, value) {

		return $("<input />").val(value).validate(rules);
	}
	
	module('validate测试');
	
	test("最小长度等于2", function() {

		var rules = {
			'minLength' : 3
		};
		
		var result1 = myFunc(rules, 'ab');
		var result2 = myFunc(rules, 'abc');
		var result3 = myFunc(rules, 'abcd');
		var result4 = myFunc(rules, 12);
		var result5 = myFunc(rules, 123);
		var result6 = myFunc(rules, 1234);
		
		ok(result1 && result2 && result3 && result4 && result5 && result6, "返回值是否为空测试");
		
		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = false;
		expected1.results = {"minLength":false};
		expected1.info = {"minLength":"validator.info.minLength"};
		expected1.params = {"minLength":3};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();
		
		expected2.result = true;
		expected2.results = {"minLength":true};
		expected2.info = {"minLength":"validator.info.minLength"};
		expected2.params = {"minLength":3};
		
		deepEqual(result2, expected2, '返回值内容测试2');

		// --------------------------------------------
		var expected3 = new ValidateResult();
		
		expected3.result = true;
		expected3.results = {"minLength":true};
		expected3.info = {"minLength":"validator.info.minLength"};
		expected3.params = {"minLength":3};
		
		deepEqual(result3, expected3, '返回值内容测试3');

		// --------------------------------------------
		var expected4 = new ValidateResult();
		
		expected4.result = false;
		expected4.results = {"minLength":false};
		expected4.info = {"minLength":"validator.info.minLength"};
		expected4.params = {"minLength":3};
		
		deepEqual(result4, expected4, '返回值内容测试4');
		
		// --------------------------------------------
		var expected5 = new ValidateResult();
		
		expected5.result = true;
		expected5.results = {"minLength":true};
		expected5.info = {"minLength":"validator.info.minLength"};
		expected5.params = {"minLength":3};
		
		deepEqual(result5, expected5, '返回值内容测试5');

		// --------------------------------------------
		var expected6 = new ValidateResult();
		
		expected6.result = true;
		expected6.results = {"minLength":true};
		expected6.info = {"minLength":"validator.info.minLength"};
		expected6.params = {"minLength":3};
		
		deepEqual(result6, expected6, '返回值内容测试6');
	});

	test("最大长度等于3", function() {

		var rules = {
			'maxLength' : 3
		};

		var result1 = myFunc(rules, 'ab');
		var result2 = myFunc(rules, 'abc');
		var result3 = myFunc(rules, 'abcd');
		var result4 = myFunc(rules, 12);
		var result5 = myFunc(rules, 123);
		var result6 = myFunc(rules, 1234);
		
		ok(result1 && result2 && result3 && result4 && result5 && result6, "返回值是否为空测试");

		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = true;
		expected1.results = {"maxLength":true};
		expected1.info = {"maxLength":"validator.info.maxLength"};
		expected1.params = {"maxLength":3};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();
		
		expected2.result = true;
		expected2.results = {"maxLength":true};
		expected2.info = {"maxLength":"validator.info.maxLength"};
		expected2.params = {"maxLength":3};
		
		deepEqual(result2, expected2, '返回值内容测试2');

		// --------------------------------------------
		var expected3 = new ValidateResult();
		
		expected3.result = false;
		expected3.results = {"maxLength":false};
		expected3.info = {"maxLength":"validator.info.maxLength"};
		expected3.params = {"maxLength":3};
		
		deepEqual(result3, expected3, '返回值内容测试3');

		// --------------------------------------------
		var expected4 = new ValidateResult();
		
		expected4.result = true;
		expected4.results = {"maxLength":true};
		expected4.info = {"maxLength":"validator.info.maxLength"};
		expected4.params = {"maxLength":3};
		
		deepEqual(result4, expected4, '返回值内容测试4');

		// --------------------------------------------
		var expected5 = new ValidateResult();
		
		expected5.result = true;
		expected5.results = {"maxLength":true};
		expected5.info = {"maxLength":"validator.info.maxLength"};
		expected5.params = {"maxLength":3};
		
		deepEqual(result5, expected5, '返回值内容测试5');

		// --------------------------------------------
		var expected6 = new ValidateResult();
		
		expected6.result = false;
		expected6.results = {"maxLength":false};
		expected6.info = {"maxLength":"validator.info.maxLength"};
		expected6.params = {"maxLength":3};
		
		deepEqual(result6, expected6, '返回值内容测试6');
		
	});

	test("固定长度等于3", function() {

		var rules = {
			'length' : 3
		};

		var result1 = myFunc(rules, 'ab');
		var result2 = myFunc(rules, 'abc');
		var result3 = myFunc(rules, 'abcd');
		var result4 = myFunc(rules, 12);
		var result5 = myFunc(rules, 123);
		var result6 = myFunc(rules, 1234);
		
		ok(result1 && result2 && result3 && result4 && result5 && result6, "返回值是否为空测试");

		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = false;
		expected1.results = {"length":false};
		expected1.info = {"length":"validator.info.length"};
		expected1.params = {"length":3};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();
		
		expected2.result = true;
		expected2.results = {"length":true};
		expected2.info = {"length":"validator.info.length"};
		expected2.params = {"length":3};
		
		deepEqual(result2, expected2, '返回值内容测试2');

		// --------------------------------------------
		var expected3 = new ValidateResult();
		
		expected3.result = false;
		expected3.results = {"length":false};
		expected3.info = {"length":"validator.info.length"};
		expected3.params = {"length":3};
		
		deepEqual(result3, expected3, '返回值内容测试3');

		// --------------------------------------------
		var expected4 = new ValidateResult();
		
		expected4.result = false;
		expected4.results = {"length":false};
		expected4.info = {"length":"validator.info.length"};
		expected4.params = {"length":3};
		
		deepEqual(result4, expected4, '返回值内容测试4');

		// --------------------------------------------
		var expected5 = new ValidateResult();
		
		expected5.result = true;
		expected5.results = {"length":true};
		expected5.info = {"length":"validator.info.length"};
		expected5.params = {"length":3};
		
		deepEqual(result5, expected5, '返回值内容测试5');

		// --------------------------------------------
		var expected6 = new ValidateResult();
		
		expected6.result = false;
		expected6.results = {"length":false};
		expected6.info = {"length":"validator.info.length"};
		expected6.params = {"length":3};
		
		deepEqual(result6, expected6, '返回值内容测试6');
	});

	test("长度在3和5之间", function() {

		var rules = {
			'minLength' : 3,
			'maxLength' : 5
		};

		var result1 = myFunc(rules, 'ab');
		var result2 = myFunc(rules, 'abc');
		var result3 = myFunc(rules, 'abcd');
		var result4 = myFunc(rules, 'abcde');
		var result5 = myFunc(rules, 'abcdef');
		var result6 = myFunc(rules, 12);
		var result7 = myFunc(rules, 123);
		var result8 = myFunc(rules, 1234);
		var result9 = myFunc(rules, 12345);
		var result10 = myFunc(rules, 123456);
		
		ok(result1 && result2 && result3 && result4 && result5 && result6 && result7 && result8 && result9 && result10, "返回值是否为空测试");

		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = false;
		expected1.results = {"minLength":false, "maxLength":true};
		expected1.info = {"minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected1.params = {"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();
		
		expected2.result = true;
		expected2.results = {"minLength":true, "maxLength":true};
		expected2.info = {"minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected2.params = {"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result2, expected2, '返回值内容测试2');

		// --------------------------------------------
		var expected3 = new ValidateResult();

		expected3.result = true;
		expected3.results = {"minLength":true, "maxLength":true};
		expected3.info = {"minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected3.params = {"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result3, expected3, '返回值内容测试3');

		// --------------------------------------------
		var expected4 = new ValidateResult();
		
		expected4.result = true;
		expected4.results = {"minLength":true, "maxLength":true};
		expected4.info = {"minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected4.params = {"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result4, expected4, '返回值内容测试4');

		// --------------------------------------------
		var expected5 = new ValidateResult();

		expected5.result = false;
		expected5.results = {"minLength":true, "maxLength":false};
		expected5.info = {"minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected5.params = {"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result5, expected5, '返回值内容测试5');

		// --------------------------------------------
		
		deepEqual(result6, expected1, '返回值内容测试6');
		deepEqual(result7, expected2, '返回值内容测试7');
		deepEqual(result8, expected3, '返回值内容测试8');
		deepEqual(result9, expected4, '返回值内容测试9');
		deepEqual(result10, expected5, '返回值内容测试10');
	});

	test("是否是数字", function() {

		var rules = {
			'number' : true
		};
		
		var result1 = myFunc(rules, '1');
		var result2 = myFunc(rules, 'a');
		ok(result1 && result2, "返回值是否为空测试");
		
		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = true;
		expected1.results = {"number":true};
		expected1.info = {"number":"validator.info.number"};
		expected1.params = {"number":true};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();
		
		expected2.result = false;
		expected2.results = {"number":false};
		expected2.info = {"number":"validator.info.number"};
		expected2.params = {"number":true};
		
		deepEqual(result2, expected2, '返回值内容测试2');
		
	});

	test("是否是数字, 且最小长度等于3", function() {

		var rules = {
			'number' : true,
			'minLength' : 3
		};
		
		var result1 = myFunc(rules, '12');
		var result2 = myFunc(rules, '123');
		var result3 = myFunc(rules, '1234');
		var result4 = myFunc(rules, 'ab');
		var result5 = myFunc(rules, 'abc');
		var result6 = myFunc(rules, 'abcd');
		ok(result1 && result2 && result3 && result4 && result5 && result6, "返回值是否为空测试");
		
		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = false;
		expected1.results = {"number":true, "minLength":false};
		expected1.info = {"number":"validator.info.number","minLength":"validator.info.minLength"};
		expected1.params = {"number":true,"minLength":3};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();

		expected2.result = true;
		expected2.results = {"number":true, "minLength":true};
		expected2.info = {"number":"validator.info.number","minLength":"validator.info.minLength"};
		expected2.params = {"number":true,"minLength":3};
		
		deepEqual(result2, expected2, '返回值内容测试2');

		// --------------------------------------------
		var expected3 = new ValidateResult();

		expected3.result = true;
		expected3.results = {"number":true, "minLength":true};
		expected3.info = {"number":"validator.info.number","minLength":"validator.info.minLength"};
		expected3.params = {"number":true,"minLength":3};
		
		deepEqual(result3, expected3, '返回值内容测试3');

		// --------------------------------------------
		var expected4 = new ValidateResult();

		expected4.result = false;
		expected4.results = {"number":false, "minLength":false};
		expected4.info = {"number":"validator.info.number","minLength":"validator.info.minLength"};
		expected4.params = {"number":true,"minLength":3};
		
		deepEqual(result4, expected4, '返回值内容测试4');

		// --------------------------------------------
		var expected5 = new ValidateResult();

		expected5.result = false;
		expected5.results = {"number":false, "minLength":true};
		expected5.info = {"number":"validator.info.number","minLength":"validator.info.minLength"};
		expected5.params = {"number":true,"minLength":3};
		
		deepEqual(result5, expected5, '返回值内容测试5');

		// --------------------------------------------
		var expected6 = new ValidateResult();

		expected6.result = false;
		expected6.results = {"number":false, "minLength":true};
		expected6.info = {"number":"validator.info.number","minLength":"validator.info.minLength"};
		expected6.params = {"number":true,"minLength":3};
		
		deepEqual(result6, expected6, '返回值内容测试6');
		
	});

	test("是否是数字, 且最大长度等于3", function() {

		var rules = {
			'number' : true,
			'maxLength' : 3
		};
		
		var result1 = myFunc(rules, '12');
		var result2 = myFunc(rules, '123');
		var result3 = myFunc(rules, '1234');
		var result4 = myFunc(rules, 'ab');
		var result5 = myFunc(rules, 'abc');
		var result6 = myFunc(rules, 'abcd');
		ok(result1 && result2 && result3 && result4 && result5 && result6, "返回值是否为空测试");
		
		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = true;
		expected1.results = {"number":true, "maxLength":true};
		expected1.info = {"number":"validator.info.number","maxLength":"validator.info.maxLength"};
		expected1.params = {"number":true,"maxLength":3};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();

		expected2.result = true;
		expected2.results = {"number":true, "maxLength":true};
		expected2.info = {"number":"validator.info.number","maxLength":"validator.info.maxLength"};
		expected2.params = {"number":true,"maxLength":3};
		
		deepEqual(result2, expected2, '返回值内容测试2');

		// --------------------------------------------
		var expected3 = new ValidateResult();

		expected3.result = false;
		expected3.results = {"number":true, "maxLength":false};
		expected3.info = {"number":"validator.info.number","maxLength":"validator.info.maxLength"};
		expected3.params = {"number":true,"maxLength":3};
		
		deepEqual(result3, expected3, '返回值内容测试3');

		// --------------------------------------------
		var expected4 = new ValidateResult();

		expected4.result = false;
		expected4.results = {"number":false, "maxLength":true};
		expected4.info = {"number":"validator.info.number","maxLength":"validator.info.maxLength"};
		expected4.params = {"number":true,"maxLength":3};
		
		deepEqual(result4, expected4, '返回值内容测试4');

		// --------------------------------------------
		var expected5 = new ValidateResult();

		expected5.result = false;
		expected5.results = {"number":false, "maxLength":true};
		expected5.info = {"number":"validator.info.number","maxLength":"validator.info.maxLength"};
		expected5.params = {"number":true,"maxLength":3};
		
		deepEqual(result5, expected5, '返回值内容测试5');

		// --------------------------------------------
		var expected6 = new ValidateResult();

		expected6.result = false;
		expected6.results = {"number":false, "maxLength":false};
		expected6.info = {"number":"validator.info.number","maxLength":"validator.info.maxLength"};
		expected6.params = {"number":true,"maxLength":3};
		
		deepEqual(result6, expected6, '返回值内容测试6');
		
	});

	test("是否是数字, 且固定长度等于3", function() {

		var rules = {
			'number' : true,
			'length' : 3
		};
		
		var result1 = myFunc(rules, '12');
		var result2 = myFunc(rules, '123');
		var result3 = myFunc(rules, '1234');
		var result4 = myFunc(rules, 'ab');
		var result5 = myFunc(rules, 'abc');
		var result6 = myFunc(rules, 'abcd');
		ok(result1 && result2 && result3 && result4 && result5 && result6, "返回值是否为空测试");
		
		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = false;
		expected1.results = {"number":true, "length":false};
		expected1.info = {"number":"validator.info.number","length":"validator.info.length"};
		expected1.params = {"number":true,"length":3};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();

		expected2.result = true;
		expected2.results = {"number":true, "length":true};
		expected2.info = {"number":"validator.info.number","length":"validator.info.length"};
		expected2.params = {"number":true,"length":3};
		
		deepEqual(result2, expected2, '返回值内容测试2');

		// --------------------------------------------
		var expected3 = new ValidateResult();

		expected3.result = false;
		expected3.results = {"number":true, "length":false};
		expected3.info = {"number":"validator.info.number","length":"validator.info.length"};
		expected3.params = {"number":true,"length":3};
		
		deepEqual(result3, expected3, '返回值内容测试3');

		// --------------------------------------------
		var expected4 = new ValidateResult();

		expected4.result = false;
		expected4.results = {"number":false, "length":false};
		expected4.info = {"number":"validator.info.number","length":"validator.info.length"};
		expected4.params = {"number":true,"length":3};
		
		deepEqual(result4, expected4, '返回值内容测试4');

		// --------------------------------------------
		var expected5 = new ValidateResult();

		expected5.result = false;
		expected5.results = {"number":false, "length":true};
		expected5.info = {"number":"validator.info.number","length":"validator.info.length"};
		expected5.params = {"number":true,"length":3};
		
		deepEqual(result5, expected5, '返回值内容测试5');

		// --------------------------------------------
		var expected6 = new ValidateResult();

		expected6.result = false;
		expected6.results = {"number":false, "length":false};
		expected6.info = {"number":"validator.info.number","length":"validator.info.length"};
		expected6.params = {"number":true,"length":3};
		
		deepEqual(result6, expected6, '返回值内容测试6');
		
	});

	test("是否是数字,且长度在3-5之间", function() {

		var rules = {
			'number' : true,
			'minLength' : 3,
			'maxLength' : 5
		};

		var result1 = myFunc(rules, 'ab');
		var result2 = myFunc(rules, 'abc');
		var result3 = myFunc(rules, 'abcd');
		var result4 = myFunc(rules, 'abcde');
		var result5 = myFunc(rules, 'abcdef');
		var result6 = myFunc(rules, 12);
		var result7 = myFunc(rules, 123);
		var result8 = myFunc(rules, 1234);
		var result9 = myFunc(rules, 12345);
		var result10 = myFunc(rules, 123456);

		ok(result1 && result2 && result3 && result4 && result5 && result6 && result7 && result8 && result9 && result10, "返回值是否为空测试");

		// --------------------------------------------
		var expected1 = new ValidateResult();
		
		expected1.result = false;
		expected1.results = {"number":false, "minLength":false, "maxLength":true};
		expected1.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected1.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result1, expected1, '返回值内容测试1');

		// --------------------------------------------
		var expected2 = new ValidateResult();

		expected2.result = false;
		expected2.results = {"number":false, "minLength":true, "maxLength":true};
		expected2.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected2.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result2, expected2, '返回值内容测试2');

		// --------------------------------------------
		var expected3 = new ValidateResult();

		expected3.result = false;
		expected3.results = {"number":false, "minLength":true, "maxLength":true};
		expected3.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected3.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result3, expected3, '返回值内容测试3');

		// --------------------------------------------
		var expected4 = new ValidateResult();

		expected4.result = false;
		expected4.results = {"number":false, "minLength":true, "maxLength":true};
		expected4.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected4.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result4, expected4, '返回值内容测试4');

		// --------------------------------------------
		var expected5 = new ValidateResult();

		expected5.result = false;
		expected5.results = {"number":false, "minLength":true, "maxLength":false};
		expected5.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected5.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result5, expected5, '返回值内容测试5');

		// --------------------------------------------
		var expected6 = new ValidateResult();

		expected6.result = false;
		expected6.results = {"number":true, "minLength":false, "maxLength":true};
		expected6.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected6.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result6, expected6, '返回值内容测试6');

		// --------------------------------------------
		var expected7 = new ValidateResult();

		expected7.result = true;
		expected7.results = {"number":true, "minLength":true, "maxLength":true};
		expected7.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected7.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result7, expected7, '返回值内容测试7');

		// --------------------------------------------
		var expected8 = new ValidateResult();

		expected8.result = true;
		expected8.results = {"number":true, "minLength":true, "maxLength":true};
		expected8.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected8.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result8, expected8, '返回值内容测试8');

		// --------------------------------------------
		var expected9 = new ValidateResult();

		expected9.result = true;
		expected9.results = {"number":true, "minLength":true, "maxLength":true};
		expected9.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected9.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result9, expected9, '返回值内容测试9');

		// --------------------------------------------
		var expected10 = new ValidateResult();

		expected10.result = false;
		expected10.results = {"number":true, "minLength":true, "maxLength":false};
		expected10.info = {"number":"validator.info.number","minLength":"validator.info.minLength", "maxLength":"validator.info.maxLength"};
		expected10.params = {"number":true,"minLength" : 3, "maxLength" : 5};
		
		deepEqual(result10, expected10, '返回值内容测试10');
		
	});
});