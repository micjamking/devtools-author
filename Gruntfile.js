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
      
      /* 
       * PostCSS: CSS Transformer via JS plugins
       * https://github.com/nDmitry/grunt-postcss
       */
      postcss: {
        options: {
          map: {
              inline: false,
              annotation: './'
          }
        },
        serve: {
            options: {
              map: true,
              processors: [

                /* 
                 * Autoprefixer: Add vendor prefixes using caniuse.com
                 * https://github.com/postcss/autoprefixer
                 */
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
              ]
            },
          src: './style.css',
          dest: './style.css'
        },
        dist: {
            options: {
              map: true,
              processors: [

                /* 
                 * CSS Nano: Modular minifier
                 * https://github.com/ben-eb/cssnano
                 */
                require('cssnano'),

                /* 
                 * Style Guide: Generate a style guide automatically
                 * https://github.com/morishitter/postcss-style-guide
                 */
                require('postcss-style-guide')({
                    name: 'DevTools Author',
                    dir: 'docs/css'
                })
              ]
            },
          src: './style.css',
          dest: './style.css'
        }
      },

      /*
       * JSHint: Validate JavaScript files
       * https://github.com/gruntjs/grunt-contrib-jshint
       */
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
            './js/**/*.js'
          ]
      },

      /*
       * JSDoc: Generate JS documentation
       * https://github.com/gruntjs/grunt-contrib-concat
       */
      jsdoc : {
        options: {
          destination: 'docs/js'
        },
        dist : {
          src: './js/**/*.js'
        }
      },

      /*
       * Concat: Concatenate JS files
       * https://github.com/gruntjs/grunt-contrib-concat
       */
      concat: {
        options: {
          sourceMap: true,
        },
        dist: {
          src: [
            './js/utils.js',
            './js/ui.js',
            './js/app.js'
          ],
          dest: './script.js',
        },
      },

      /*
       * Uglify: Minify JS files
       * https://github.com/gruntjs/grunt-contrib-uglify
       */
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

      /*
       * Watch: Run tasks whenever watched files change
       * https://github.com/gruntjs/grunt-contrib-watch
       */
      watch: {
        options: {
          livereload: 35729
        },
        html: {
          files: ['./**/*.html']
        },
        sass: {
          files: 'scss/**/*.scss',
          tasks: ['sass', 'postcss:serve']
        },
        scripts: {
          files: 'js/**/*.js',
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
        'sass',
        'postcss:serve',
        'jshint',
        'concat',
        'watch'
    ]);

    // Default: Production build
    grunt.registerTask('default', [
        'sass',
        'postcss:dist',
        'jshint',
        'jsdoc',
        'concat',
        'uglify'
    ]);
};
