/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Project settings
    chrome: {
      // configurable paths
      app: 'app',
      dist: 'dist'
    },
    
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    
    // Task configuration.
    watch: {
      css: {
        files: ['<%= chrome.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer', 'cssmin']
      },
      js: {
        files: ['<%= chrome.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'copy:js']
      }
    },
 
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= chrome.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= chrome.app %>/images',
        javascriptsDir: '<%= chrome.app %>/scripts',
        fontsDir: '<%= chrome.app %>/styles/fonts',
        importPath: '<%= chrome.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Add CSS vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    
    // The produce minified CSS in the dist folder
    cssmin: {
      dist: {
        files: {
          '<%= chrome.dist %>/styles/main.css': '.tmp/styles/{,*/}*.css'
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc',
      },
      all: [ 'Gruntfile.js', '<%= chrome.app %>/scripts/{,*/}*.js' ]
    },

    // Copies remaining files to places other tasks can use
    copy: {
      js: {
        expand: true,
        cwd: '<%= yeoman.app %>/scripts',
        dest: '<%= yeoman.dist %>/scripts',
        src: '{,*/}*.js'
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [ '.tmp', '<%= chrome.dist %>/*' ]
        }]
      },
      server: '.tmp'
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: 'compass:server',
      dist: 'compass:dist'
    }
  });

  grunt.registerTask('serve', function (target) {

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'watch'
    ]);
  });

  // Default task.
  grunt.registerTask('default', [
    'newer:jshint'
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'cssmin'
  ]);
};
