module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			development: {
				files: {
					'css/main.css': ['css/less/main.less', 'app/*/*.less']
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "./",
					include: ["app/app.module.js"],
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
			css: {
				files: ['css/less/*.less', 'app/*/*.less'],
				tasks: ['less'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: ['app/*.js', 'app/*/*.js'],
				tasks: ['requirejs'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['less', 'requirejs']);

};