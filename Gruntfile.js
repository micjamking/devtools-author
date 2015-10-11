module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
      // CSS | Process SCSS files
      sass: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        },
        dist: {
          files: [{
            expand: true,
            cwd: 'scss/',
            src: ['{,*/}*.scss'],
            dest: './',
            ext: '.css'
          }]
        }
      },

      // Add vendor prefixes
      postcss: {
        options: {
          map: {
              inline: false,
              annotation: './'
          },
          processors: [
            require('autoprefixer-core')({browsers: ['last 2 versions']})
          ]
        },
        dist: {
          files: [{
              expand: true,
              cwd: './',
              src: '{,*/}*.css',
              dest: './'
          }]
        }
      },

      // Minify CSS
      cssmin: {
        options: {
          sourceMap: true
        },
        target: {
          files: {
            './style.css': './style.css'
          }
        }
      },

      // JS | Concat js files
      concat: {
        dist: {
          src: [
                './js/app.js'
               ],
          dest: './script.js',
        },
      },

      // Check js files for errors
      jshint: {
          options: {
            node: true,
            browser: true,
            esnext: true,
            bitwise: true,
            camelcase: false,
            curly: true,
            eqeqeq: true,
            immed: true,
            indent: 2,
            latedef: true,
            newcap: true,
            noarg: true,
            quotmark: 'single',
            regexp: true,
            undef: true,
            unused: true,
            strict: true,
            trailing: true,
            smarttabs: true,
            globals: {}
          },
          grunt: [
            'Gruntfile.js',
          ],
          scripts: [
            './js/app.js'
          ]
      },

      // Minify js files
      uglify: {
        options: {
          preserveComments: false,
          mangle: true
        },
        dist: {
          files: {
            './script.js': ['./script.js']
          }
        }
      },

      // Watch files for changes
      watch: {
        options: {
          livereload: 35729
        },
        html: {
          files: ['./**/*.html']
        },
        sass: {
          files: './scss/**/*.scss',
          tasks: ['sass', 'postcss']
        },
        scripts: {
          files: './js/app.js',
          tasks: ['jshint:scripts', 'concat']
        },
        gruntfile: {
          files: 'Gruntfile.js',
          tasks: ['jshint:grunt']
        }
      }

    });

    // Development
    grunt.registerTask('serve', [
        'jshint',
        'sass',
        'postcss',
        'concat',
        'watch'
    ]);

    // Build
    grunt.registerTask('build', [
        'jshint',
        'sass',
        'postcss',
        'cssmin',
        'concat',
        'uglify'
    ]);

    // Default
    grunt.registerTask('default', [
        'build',
    ]);

};
