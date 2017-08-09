module.exports = grunt => {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		watch: {
			css: {
				files: ['src/css/*.scss'],
				tasks: ['newer:postcss'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			js: {
				files: ['src/js/*.js'],
				tasks: ['babel'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			imgs: {
				files: ['src/images/*.{png,jpg,gif}'],
				tasks: ['imagemin'],
				options: {
					spawn: false
				}
			},
			pug: {
				files: ['views/*.pug'],
				tasks: [],
				options: {
					spawn: false,
					livereload: true
				}
			}
		},
		postcss: {
			options: {
				map: {
					inline: false,
					dist: 'public/css/map/'
				},
				parser: require('postcss-scss'),
				processors: [
					require('precss')(),
					require('postcss-cssnext')({
						warnForDuplicates: false
					}),
					require('cssnano')(),
					require('lost')(),
					require('postcss-strip-inline-comments')()
				],
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/css/',
					src: ['*.scss'],
					dest: 'public/css',
					ext: '.css',
				}],
			}
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ['env'],
				comments: false,
				sourceMaps: true,
				minified: true,
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src/js',
					src: '*.js',
					dest: 'public/js',
					ext: '.js',
				}]
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/images/'
				}]
			}
		},
		copy: {
			fonts: {
				files: [{
					expand: true,
					cwd: 'src/fonts',
					src: ['**/*'],
					dest: 'public/fonts'
				}]
			},
			main: {
				files: [{
					expand: true,
					cwd: 'src/main',
					src: ['*.*'],
					dest: 'public'
				}],
			},
		},
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['imagemin', 'babel', 'postcss', 'copy']);
	grunt.registerTask('init', ['imagemin', 'babel', 'postcss', 'copy']);
};
