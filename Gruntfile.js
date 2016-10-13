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
      },
      lib: {
        src: ['public/lib/*.js'],
        dest: 'public/dist/lib.js',
      },
    },

    uglify: {
      options: {
        mangle: true,
      },
      target: {
        files: {
          'public/dist/client.min.js': ['public/dist/client.js'],
          'public/dist/lib.min.js': ['public/dist/lib.js'],
          'public/dist/style.min.css': ['public/style.css'],
        }
      }
    },

    clean: ["public/dist"],

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

  grunt.registerTask('start', [
    'nodemon', 
  ]);

  grunt.registerTask('git', [
    'gitadd', 'gitcommit', 'gitpush'
  ]);

  grunt.registerTask('build', [
    'clean', 'concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'eslint' // add your deploy tasks here
  ]);


};
