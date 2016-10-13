module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },


    eslint: {
      target: [
        // Add list of files to lint here
        '*.js'
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': ['public/style.css'],
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },

    gitadd: {
      task: {
        options: {
          force: false,
          all: true
        }
      }
    },

    gitcommit: {
      target: {
        options: {
          message: 'Grunt doing automated commit'
          // Target-specific options go here. 
        },
        files: {
            // Specify the files you want to commit 
        }
      }
    },

    gitpush: {
      target: {
        options: {
          // Target-specific options go here.
          remote: 'live7',
          branch: 'master' 
        }
      }
    },

    concat: {
      options: {
        separator: ';',
        stripBanners: true,
      },
      client: {
        src: ['public/client/*.js'],
        dest: 'public/dist/client.js',
      }
    },

    uglify: {
      options: {
        mangle: true,
      },
      target: {
        files: {
          'public/dist/client.min.js': ['public/dist/client.js'],
          'public/dist/backbone.min.js': ['public/lib/backbone.js'],
          'public/dist/handlebars.min.js': ['public/lib/handlebars.js'],
          'public/dist/jquery.min.js': ['public/lib/jquery.js'],
          'public/dist/underscore.min.js': ['public/lib/underscore.js'],
        }
      }
    },

    clean: ['public/dist'],

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('git', [
    'gitadd', 'gitcommit', 'gitpush'
  ]);

  grunt.registerTask('build', [
    'eslint', 'test', 'clean', 'concat', 'uglify', 'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['build', 'git']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'nodemon',
  ]);

};
