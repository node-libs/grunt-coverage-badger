/*
 * grunt-coverage-badger
 * https://github.com/kuldeepkeshwar/grunt-coverage-badger
 *
 * Copyright (c) 2016 kuldeep keshwar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-bump');
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
      bump: {
          options: {
              files: ['package.json'],
              updateConfigs: [],
              commit: true,
              commitMessage: 'Release v%VERSION%',
              commitFiles: ['-a'],
              createTag: true,
              tagName: 'v%VERSION%',
              tagMessage: 'Version %VERSION%',
              push: true,
              pushTo: 'upstream',
              gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
              globalReplace: false,
              prereleaseName: false,
              regExp: false
          }
      },
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    coverage_badger: {
      default_options: {
        options: {
          istanbulReportFile: "./cobertura-coverage.xml",
          badgeFileName: "coverage",
          thresholds: {
              excellent: 90,
              good: 65
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
      'clean',
      'coverage_badger'
      //, 'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
