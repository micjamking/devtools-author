module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
      
      /* 
       * PostCSS: CSS Transformer via JS plugins
       * https://github.com/postcss/postcss
       */
      postcss: {
        options: {
          map: {
              inline: false,
              annotation: './'
          },
          
          /* 
           * PostCSS SCSS: SCSS parser for PostCSS
           * https://github.com/postcss/postcss-scss
           */
          parser: require('postcss-scss'),
          processors: [
            
            /* 
             * PreCSS: Sass-like markup
             * https://github.com/jonathantneal/precss
             */
            require('precss'),
            
            /* 
             * Autoprefixer: Add vendor prefixes using caniuse.com
             * https://github.com/postcss/autoprefixer
             */
            require('autoprefixer-core')({
                browsers: ['last 2 versions']
            }),
            
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
                theme: 'default',
                name: 'DevTools Author',
                dir: 'docs/css'
            })
          ]
        },
        dist: {
          files: [{
              expand: true,
              cwd: './',
              src: './scss/{,*/}*.scss',
              dest: './'
          }]
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
            './js/app.js'
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
        dist: {
          src: [
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
          files: './scss/**/*.scss',
          tasks: ['postcss']
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
        'concat',
        'postcss',
        'watch'
    ]);

    // Default: Production build
    grunt.registerTask('default', [
        'jshint',
        'postcss',
        'concat',
        'uglify'
    ]);
};
