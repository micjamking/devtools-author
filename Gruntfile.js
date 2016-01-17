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
                 * Autoprefixer: Add vendor prefixes using caniuse.com
                 * https://github.com/postcss/autoprefixer
                 */
                require('autoprefixer')({
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
       * ESLint: The pluggable linting utility for JavaScript
       * https://github.com/sindresorhus/grunt-eslint
       */
      eslint: {
          options: {},
          grunt: [
            'Gruntfile.js'
          ],
          scripts: [
            './js/**/*.js'
          ]
      },

      /*
       * ESDoc: Generate JavaScript(ES6) documentation
       * https://github.com/cleversoap/grunt-esdoc
       */
      esdoc : {
        dist : {
          options: {
            destination: 'docs/es',
            source: './js'
          }
        }
      },
      
      /*
       * Webpack: Flexible Module Loader
       * https://github.com/webpack/grunt-webpack
       */
      webpack: {
        build: {
          devtool: 'source-map',
          entry: './js/app.js',
          output: {
            path: './',
            filename: 'script.js'
          },
          module: {
            loaders: [{
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            }]
          },
          resolve: {
            root: ['./js']
          }
        }
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
          tasks: ['sass', 'postcss:serve']
        },
        scripts: {
          files: './js/**/*.js',
          tasks: ['eslint:scripts', 'webpack']
        },
        gruntfile: {
          files: './Gruntfile.js',
          tasks: ['eslint:grunt']
        }
      }

    });

    // Development
    grunt.registerTask('serve', [
        'sass',
        'postcss:serve',
        'eslint',
        'webpack',
        'watch'
    ]);

    // Default: Production build
    grunt.registerTask('default', [
        'sass',
        'postcss:dist',
        'eslint',
        'esdoc',
        'concat',
        'uglify'
    ]);
};
