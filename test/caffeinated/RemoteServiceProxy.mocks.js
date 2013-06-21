$(function() {
	
	$.mockjax({
		url : 'sys/login/login.json',
		status : 200,
		responseTime : 0,
		responseText : {"username" : "zhenglei", "pwd" : "000", "error": ""}
	});

	$.mockjax({
		url : 'sys/checklogin/checklogin.json',
		status : 200,
		responseTime : 0,
		response: function(settings) {
			
			if (settings.data.username == "zhenglei" && settings.data.pwd == "000") {
				
				console.log("111");
				
				this.responseText = {"username" : "zhenglei", 
						"pwd" : "000", 
						"sex" : "1",
						"age" : 30,
						"error": ""};
			}
			else {
				
				console.log("222");
				this.responseText = {"msg" : "登陆失败", "error": ""};
			}
        }
	});
	
});