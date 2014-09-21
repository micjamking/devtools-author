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
    devtools: {
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
      html: {
        files: ['<%= devtools.app %>/panel/{,*/}*.html'],
        tasks: ['copy:html']
      },
      css: {
        files: ['<%= devtools.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      js: {
        files: [ 'Gruntfile.js', '<%= devtools.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'copy:js']
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep', 'copy:bower']
      },
    },
 
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= devtools.app %>/styles',
        cssDir: '.tmp/styles',
        javascriptsDir: '<%= devtools.app %>/scripts',
        fontsDir: '<%= devtools.app %>/styles/fonts',
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
          dest: '<%= devtools.dist %>/styles/'
        }]
      }
    },
    
    // The produce minified CSS in the dist folder
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= devtools.dist %>/styles/',
          src: ['*.css', '!*.min.css'],
          dest: '<%= devtools.dist %>/styles/'
        }]
      }
    },
    
    // Detect errors & potential problems in JS files
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc',
      },
      all: [ 'Gruntfile.js', '<%= devtools.app %>/scripts/{,*/}*.js' ]
    },

    // Copies remaining files
    copy: {
      html: {
        expand: true,
        cwd: '<%= devtools.app %>/panel',
        dest: '<%= devtools.dist %>/panel',
        src: '{,*/}*.html'
      },
      js: {
        expand: true,
        cwd: '<%= devtools.app %>/scripts',
        dest: '<%= devtools.dist %>/scripts',
        src: '{,*/}*.js'
      },
      bower: {
        expand: true,
        cwd: '<%= devtools.app %>/bower_components',
        dest: '<%= devtools.dist %>/bower_components',
        src: '{,*/}*.js'
      }
    },
    
    // Wire up bower components
    wiredep: {
      target: {
        src: [
          '<%= devtools.app %>/panel/theme.html',
          '<%= devtools.app %>/styles/theme.scss',
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [ '.tmp', '<%= devtools.dist %>/{,*/}*.*' ]
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: ['compass:server'],
      dist: ['compass:dist']
    }
  });

  grunt.registerTask('serve', [
    'clean',
    'bowerInstall',
    'concurrent:server',
    'autoprefixer',
    'copy',
    'watch'
  ]);

  grunt.registerTask('test', [
    'newer:jshint'
  ]);

  // Default task.
  grunt.registerTask('default', [
    'newer:jshint',
    'clean',
    'bowerInstall',
    'concurrent:dist',
    'autoprefixer',
    'cssmin',
    'copy'
  ]);
};
