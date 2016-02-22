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
        files: ['<%= devtools.app %>/{,*/}*.html'],
        tasks: ['copy:html']
      },
      css: {
        files: ['<%= devtools.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      js: {
        files: [ 'Gruntfile.js', '<%= devtools.app %>/scripts/{,*/}*.js', '<%= devtools.app %>/scripts/{,*/}*.json'],
        tasks: ['newer:jshint:all', 'copy:js']
      },
      images: {
        files: [ '<%= devtools.app %>/images/{,*/}*.png'],
        tasks: ['copy:images']
      },
      jsTest: {
        files: ['test/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        includePaths: [ '<%= devtools.app %>/styles' ],
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= devtools.app %>/styles',
          src: ['{,*/}*.scss'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
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
          src: ['**/*.css'],
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
      all: [
        'Gruntfile.js',
        '<%= devtools.app %>/scripts/{,*/}*.js',
        '!<%= devtools.app %>/scripts/ga.js'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    // Copies remaining files
    copy: {
      html: {
        expand: true,
        cwd: '<%= devtools.app %>',
        dest: '<%= devtools.dist %>',
        src: '{,*/}*.html'
      },
      js: {
        expand: true,
        cwd: '<%= devtools.app %>/scripts',
        dest: '<%= devtools.dist %>/scripts',
        src: ['{,*/}*.js', '{,*/}*.json']
      },
      images: {
        expand: true,
        cwd: '<%= devtools.app %>/images',
        dest: '<%= devtools.dist %>/images',
        src: [
          '{,*/}*.png',
          '!screenshots/{,*/}*.png',
          '!440x280_small-tile.png',
          '!920x680_large-tile.png',
          '!1400x560_marquee.png',
          '!icon_512.png'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [ '.tmp', '<%= devtools.dist %>/**/*' ]
        }]
      }
    },

    zip: {
      'dist.zip': {
        src: ['<%= devtools.dist %>/**/*', 'devtools.html', 'manifest.json'],
        dest: 'dist.zip',
        compression: 'DEFLATE'
      }
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'clean',
    'sass',
    'autoprefixer',
    'copy',
    'karma'
  ]);

  grunt.registerTask('serve', [
    'clean',
    'sass',
    'autoprefixer',
    'copy',
    'watch'
  ]);

  // Default task.
  grunt.registerTask('default', [
    'newer:jshint',
    'clean',
    'sass',
    'autoprefixer',
    'cssmin',
    'copy'
  ]);

  grunt.registerTask('package', [
    'test',
    'default',
    'zip'
  ]);
};
