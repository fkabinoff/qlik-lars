module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		ngtemplates: {
			app: {
				src: 'app/views/*.html',
				dest: 'app/templates.js',
				options: {
					bootstrap:  function(module, script) {
						return 'define([], function() { var templates = function($templateCache) {' + script + '}; templates.$inject = ["$templateCache"]; return templates; });';
					}
				}
			}
		},
		less: {
			development: {
				options: {
					
				},
				files: {
					'css/main.css': 'css/less/main.less'
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "./",
					include: ["app/app.js"],
					out: "app-build.js",
					generateSourceMaps: true,
					preserveLicenseComments: false,
					error: function(done, err) {
						grunt.log.warn(err);
						done();
					}
				}
			}
		},
		watch: {
			templates: {
				files: ['app/views/*.html'],
				tasks: ['ngtemplates'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['css/less/*.less'],
				tasks: ['less'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: ['app/*.js'],
				tasks: ['requirejs'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//grunt.registerTask('build', ['ngtemplates', 'less', 'requirejs']);
	grunt.registerTask('build', ['less', 'requirejs']);

};