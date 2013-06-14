/*
 * iceCoffee UI
 * https://github.com/CaffeinatedJS/CaffeinatedJS
 *
 * Copyright (c) 2013 "yisiqi" Siqi Yi
 * Licensed under the MIT license.
 * https://github.com/CaffeinatedJS/CaffeinatedJS/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		  pkg		: grunt.file.readJSON('package.json')

		, connect		: {
			  server	: {
			  	  options	: {
			  	  	  port	: 9000
			  	  	, base	: '.'
			  	  }
			  }
		}

		, qunit		: {
			   all	: {
				  options	: {
				  	  urls	: [
						  'http://127.0.0.1:9000/test/caffeinated/index.html'
					  ]
				  }
			   }

		  }

	});

	grunt.registerTask('default', ['connect', 'qunit']);
	grunt.registerTask('test', ['qunit']);

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

}