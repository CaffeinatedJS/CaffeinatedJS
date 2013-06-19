/**
 * 作者：郑磊
 * 创建日期：2013-6-18
 * 完成日期：2013-6-19
 * 备注：validate插件测试用例
 */

$(function() {
	
	function exeValidate(rules, value) {

		return $("<input />").val(value).validate(rules);
	}
	
	// 动态获取Result,按照先字母后数字的顺序
	function getResultArray(rules, p_length) {

		var ary = new Array(p_length);
		
		var word = 'a';
		var num = '1';
		
		for (var i = 0;i < p_length / 2;i++) {
			
			word += "a";
			num += "1";
			
			ary[i] = exeValidate(rules, word);
			ary[i + p_length / 2] = exeValidate(rules, num);
		}
		
		return ary;
	}
	
	// booleanAry为期望的验证结果，顺序参照rules
	function getExpected(rules, booleanAry) {
		
		var result = true;
		
		for (var i = 0;i < booleanAry.length;i++) {
			
			if (!booleanAry[i]) {
				
				result = false;
				break;
			}
		}
		
		var expected = new ValidateResult()
			,resultsJSON = {}
			,infoJSON = {};
		
		expected.result = result;
		expected.params = rules;
		
		var n = 0;
		
		for(key in rules) {
			
			resultsJSON[key] = booleanAry[n];
			infoJSON[key] = "validator.info." + key;
			n++;
		}
	
		expected.results = resultsJSON;
		expected.info = infoJSON;
		
		return expected;
	}
	
	module('validate测试');
	
	test("最小长度等于2", function() {

		var rules = {
			'minLength' : 3
		};
		
		var aryResult = getResultArray(rules, 6);
		
		ok(aryResult[0] && aryResult[1] && aryResult[2] && aryResult[3] && aryResult[4] && aryResult[5], "返回值是否为空测试");
		
		var expected1 = getExpected(rules,[false])
			,expected2 = getExpected(rules,[true]);
		
		deepEqual(aryResult[0], expected1, '返回值内容测试1');
		deepEqual(aryResult[1], expected2, '返回值内容测试2');
		deepEqual(aryResult[2], expected2, '返回值内容测试3');
		deepEqual(aryResult[3], expected1, '返回值内容测试4');
		deepEqual(aryResult[4], expected2, '返回值内容测试5');
		deepEqual(aryResult[5], expected2, '返回值内容测试6');
	});

	test("最大长度等于3", function() {

		var rules = {
			'maxLength' : 3
		};
		
		var aryResult = getResultArray(rules, 6);
		
		ok(aryResult[0] && aryResult[1] && aryResult[2] && aryResult[3] && aryResult[4] && aryResult[5], "返回值是否为空测试");
		
		var expected1 = getExpected(rules,[false])
			,expected2 = getExpected(rules,[true]);
		
		deepEqual(aryResult[0], expected2, '返回值内容测试1');
		deepEqual(aryResult[1], expected2, '返回值内容测试2');
		deepEqual(aryResult[2], expected1, '返回值内容测试3');
		deepEqual(aryResult[3], expected2, '返回值内容测试4');
		deepEqual(aryResult[4], expected2, '返回值内容测试5');
		deepEqual(aryResult[5], expected1, '返回值内容测试6');
	});

	test("固定长度等于3", function() {

		var rules = {
			'length' : 3
		};

		var aryResult = getResultArray(rules, 6);
		
		ok(aryResult[0] && aryResult[1] && aryResult[2] && aryResult[3] && aryResult[4] && aryResult[5], "返回值是否为空测试");
		
		var expected1 = getExpected(rules,[false])
			,expected2 = getExpected(rules,[true]);
		
		deepEqual(aryResult[0], expected1, '返回值内容测试1');
		deepEqual(aryResult[1], expected2, '返回值内容测试2');
		deepEqual(aryResult[2], expected1, '返回值内容测试3');
		deepEqual(aryResult[3], expected1, '返回值内容测试4');
		deepEqual(aryResult[4], expected2, '返回值内容测试5');
		deepEqual(aryResult[5], expected1, '返回值内容测试6');
	});

	test("长度在3和5之间", function() {

		var rules = {
			'minLength' : 3,
			'maxLength' : 5
		};

		var aryResult = getResultArray(rules, 10);
		
		ok(aryResult[0] && aryResult[1] && aryResult[2] && aryResult[3] && aryResult[4] 
			&& aryResult[5] && aryResult[6] && aryResult[7] && aryResult[8] && aryResult[9], "返回值是否为空测试");
		
		var expected2 = getExpected(rules,[true,true])
			,expected3 = getExpected(rules,[true,false])
			,expected4 = getExpected(rules,[false,true]);

		deepEqual(aryResult[0], expected4, '返回值内容测试1');
		deepEqual(aryResult[1], expected2, '返回值内容测试2');
		deepEqual(aryResult[2], expected2, '返回值内容测试3');
		deepEqual(aryResult[3], expected2, '返回值内容测试4');
		deepEqual(aryResult[4], expected3, '返回值内容测试5');
		deepEqual(aryResult[5], expected4, '返回值内容测试6');
		deepEqual(aryResult[6], expected2, '返回值内容测试7');
		deepEqual(aryResult[7], expected2, '返回值内容测试8');
		deepEqual(aryResult[8], expected2, '返回值内容测试9');
		deepEqual(aryResult[9], expected3, '返回值内容测试10');
	});

	test("是否是数字", function() {

		var rules = {
			'number' : true
		};
		
		var aryResult = getResultArray(rules, 2);
		
		ok(aryResult[0] && aryResult[1], "返回值是否为空测试");
		
		var expected1 = getExpected(rules,[false])
		,expected2 = getExpected(rules,[true]);

		deepEqual(aryResult[0], expected1, '返回值内容测试1');
		deepEqual(aryResult[1], expected2, '返回值内容测试2');
	});

	test("是否是数字, 且最小长度等于3", function() {

		var rules = {
			'number' : true,
			'minLength' : 3
		};

		var aryResult = getResultArray(rules, 6);
		
		ok(aryResult[0] && aryResult[1] && aryResult[2] && aryResult[3] && aryResult[4] && aryResult[5], "返回值是否为空测试");

		var expected1 = getExpected(rules,[false,false])
			,expected2 = getExpected(rules,[true,true])
			,expected3 = getExpected(rules,[true,false])
			,expected4 = getExpected(rules,[false,true]);
		
		deepEqual(aryResult[0], expected1, '返回值内容测试1');
		deepEqual(aryResult[1], expected4, '返回值内容测试2');
		deepEqual(aryResult[2], expected4, '返回值内容测试3');
		deepEqual(aryResult[3], expected3, '返回值内容测试4');
		deepEqual(aryResult[4], expected2, '返回值内容测试5');
		deepEqual(aryResult[5], expected2, '返回值内容测试6');
	});

	test("是否是数字, 且最大长度等于3", function() {

		var rules = {
			'number' : true,
			'maxLength' : 3
		};

		var aryResult = getResultArray(rules, 6);
		
		ok(aryResult[0] && aryResult[1] && aryResult[2] && aryResult[3] && aryResult[4] && aryResult[5], "返回值是否为空测试");

		var expected1 = getExpected(rules,[false,false])
			,expected2 = getExpected(rules,[true,true])
			,expected3 = getExpected(rules,[true,false])
			,expected4 = getExpected(rules,[false,true]);
		
		deepEqual(aryResult[0], expected4, '返回值内容测试1');
		deepEqual(aryResult[1], expected4, '返回值内容测试2');
		deepEqual(aryResult[2], expected1, '返回值内容测试3');
		deepEqual(aryResult[3], expected2, '返回值内容测试4');
		deepEqual(aryResult[4], expected2, '返回值内容测试5');
		deepEqual(aryResult[5], expected3, '返回值内容测试6');
	});

	test("是否是数字, 且固定长度等于3", function() {

		var rules = {
			'number' : true,
			'length' : 3
		};

		var aryResult = getResultArray(rules, 6);
		
		ok(aryResult[0] && aryResult[1] && aryResult[2] && aryResult[3] && aryResult[4] && aryResult[5], "返回值是否为空测试");

		var expected1 = getExpected(rules,[false,false])
			,expected2 = getExpected(rules,[true,true])
			,expected3 = getExpected(rules,[true,false])
			,expected4 = getExpected(rules,[false,true]);
		
		deepEqual(aryResult[0], expected1, '返回值内容测试1');
		deepEqual(aryResult[1], expected4, '返回值内容测试2');
		deepEqual(aryResult[2], expected1, '返回值内容测试3');
		deepEqual(aryResult[3], expected3, '返回值内容测试4');
		deepEqual(aryResult[4], expected2, '返回值内容测试5');
		deepEqual(aryResult[5], expected3, '返回值内容测试6');
	});

	test("是否是数字,且长度在3-5之间", function() {

		var rules = {
			'number' : true,
			'minLength' : 3,
			'maxLength' : 5
		};

		var aryResult = getResultArray(rules, 10);
		
		ok(aryResult[0] && aryResult[1] && aryResult[2] && aryResult[3] && aryResult[4] 
			&& aryResult[5] && aryResult[6] && aryResult[7] && aryResult[8] && aryResult[9], "返回值是否为空测试");

		var expected1 = getExpected(rules,[false,false,true])
			,expected2 = getExpected(rules,[false,true,true])
			,expected3 = getExpected(rules,[false,true,false])
			,expected4 = getExpected(rules,[true,false,true])
			,expected5 = getExpected(rules,[true,true,false])
			,expected6 = getExpected(rules,[true,true,true]);

		deepEqual(aryResult[0], expected1, '返回值内容测试1');
		deepEqual(aryResult[1], expected2, '返回值内容测试2');
		deepEqual(aryResult[2], expected2, '返回值内容测试3');
		deepEqual(aryResult[3], expected2, '返回值内容测试4');
		deepEqual(aryResult[4], expected3, '返回值内容测试5');
		deepEqual(aryResult[5], expected4, '返回值内容测试6');
		deepEqual(aryResult[6], expected6, '返回值内容测试7');
		deepEqual(aryResult[7], expected6, '返回值内容测试8');
		deepEqual(aryResult[8], expected6, '返回值内容测试9');
		deepEqual(aryResult[9], expected5, '返回值内容测试10');
	});

	test("构造方法测试", function() {

		var rules = {
			'number' : true
		};

		var aryResult = getResultArray(rules, 2);
		
		ok(aryResult[0] && aryResult[1], "返回值是否为空测试");
		
		var expected1 = new ValidateResult(false,{"number":"validator.info.number"},{"number":true});
		
		deepEqual(aryResult[0], expected1, '返回值内容测试1');
		
		var expected2 = new ValidateResult(true,{"number":"validator.info.number"},{"number":true});
		
		deepEqual(aryResult[1], expected2, '返回值内容测试2');
	});
});