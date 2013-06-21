/**
 * 作者：郑磊

 * 
 * 创建日期：2013-6-19 完成日期：2013-6-20 备注：RemoteServiceProxy插件测试用例
 */

$(function() {

	module('RemoteServiceProxy测试');
	
	var SERVICE_BASE_URL = "sys/";
	
	var LoginService = function() {

		function _login(username, pwd) {
			
			var proxy = new RemoteServiceProxy(SERVICE_BASE_URL + "login");
			proxy.invoke(arguments.callee, arguments[arguments.length - 1], username, pwd);
		}

		function _checklogin(username, pwd) {
			
			var proxy = new RemoteServiceProxy(SERVICE_BASE_URL + "checklogin");
			proxy.invoke(arguments.callee, arguments[arguments.length - 1], username, pwd);
		}

		function _sendParam(username, pwd) {
			
			var proxy = new RemoteServiceProxy(SERVICE_BASE_URL + "sendParam");
			proxy.invoke(arguments.callee, arguments[arguments.length - 1], username, pwd);
		}
		
		return {
			login	: _login,
			checklogin : _checklogin,
			sendParam : _sendParam
		};
		
	};
	
	asyncTest("RemoteServiceProxy测试", function() {
		
		var loginService = new LoginService();
		var qw;
		
		loginService.login("zheng","0", {success:function(result){
			
			qw = {username: "zhenglei", pwd: "000", error: ""};
			
			deepEqual(result, qw,"返回对象测试");
			
			start();
		}
		});
		
		loginService.checklogin("zhenglei","000", {success:function(result){
			
			qw = {"username":"zhenglei","pwd":"000","sex":"1","age":30,"error":""};
			deepEqual(result, qw,"登陆成功测试");
			
			start();
		}
		});
		
		loginService.checklogin("zhenglei","00", {success:function(result){
			
			qw = {"msg":"登陆失败","error":""};
			deepEqual(result, qw,"登陆失败测试");
			
			start();
		}
		});
		
		$.mockjax({
			url : 'sys/sendParam/sendParam.json',
			status : 200,
			responseTime : 0,
			response: function(settings) {
				
				var qw = {"username":"zheng","pwd":"000"};
				
				deepEqual(settings.data, qw,"接收参数测试");
				
				this.responseText = {"msg" : "获取参数完成", "error": ""};
				start();
	        }
		});
		
		loginService.sendParam("zheng","000");
	});
});