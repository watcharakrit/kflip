module.exports = function(grunt) {

  'use strict';


  /*
  | ============================================================================
  | Setting: Path
  | ============================================================================
  */
  var paths = {
    src           : './src',
    output        : './output',
    dist          : './dist',

    source        : './src',
    sourceScripts : './src/scripts',
    sourceStyles  : './src/styles'
  };
  var port = 5555;
  // ============================================================================


  /*
  | ============================================================================
  | Inject JS/CSS to html
  | ============================================================================
  */
  var path     = require('path'),
      $script     = paths.sourceScripts,
      $css     = paths.sourceStyles,
      $output  = paths.output;

  // var injectData = {
  //   // bower
  //   bower: {
  //     styles: [
  //     ],
  //     scripts: [
  //     ]
  //   },

  //   // styles
  //   styles: [
  //   ],

  //   // scipts
  //   scripts: [
  //   ]
  // };
  // ============================================================================










  /*
  | ============================================================================
  | Grunt : Config
  | ============================================================================
  */
  grunt.initConfig({
    paths: paths,


    // clean
    // ============================
    clean: {

      dev: {
        src: [
          'dist',
          'output'
        ]
      }

    },
    // ============================


    // copy : use in dist task
    // ============================
    copy: {

      img: {
        expand: true,
        cwd: '<%= paths.source %>',
        src: 'img/**',
        dest: '<%= paths.dist %>/src/'
      },

      output: {
        expand: true,
        cwd: '<%= paths.output %>',
        src: '**',
        dest: '<%= paths.dist %>'
      },

      script: {
        expand: true,
        cwd: '<%= paths.source %>',
        src: 'scripts/**',
        dest: '<%= paths.dist %>/src/'
      }
    },
    // ============================


    // javascript : babel ES6 Complier
    // ============================
    babel: {

      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: './',
          src: '<%= paths.sourceScripts %>/*.js',
          dest: '<%= paths.output %>/src/scripts'
        }]
      }

    },
    // ============================


    // scss
    // ============================
    sass: {

      dev: {
        options: {
          sourcemap: 'none',
          style: 'expanded',
          loadPath: '<%= paths.src %>'
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: './',
          src: '<%= paths.sourceStyles %>/*.scss',
          dest: '<%= paths.output %>/src/styles',
          ext: '.css'
        }]
      }

    },
    // ============================


    // jade
    // ============================
    jade: {

      dev: {
        options: {
          basedir : '<%= paths.src %>',
          pretty  : true,
          // data    : injectData
        },
        files: [{
          expand  : true,
          flatten : true,
          cwd     : './',
          src     : ['<%= paths.source %>/*.jade',
                    '!<%= paths.source %>/templates/{,*/}*.jade'
                    ],
          dest    : '<%= paths.output %>',
          ext     : '.html'
        }]
      }

    },
    // ============================


    // browser sync
    // ============================
    browserSync: {

      dev: {
        options: {
          watchTask: true,
          port: port,
          server: {
            baseDir: '<%= paths.output %>',
            routes: {
              '/src': 'src'
            }
          }
        },
        bsFiles: {
          src : [
            '<%= paths.output %>/src/styles/*.css',
            '<%= paths.output %>/*.html'
          ]
        }
      }

    },
    // ============================


    // watch
    // ============================
    watch: {

      sass: {
        files: [
          '<%= paths.sourceStyles %>/**/*.scss'
        ],
        tasks: [
          'sass'
        ],
        options: {
          spawn: false
        }
      },

      jade: {
        files: [
          '<%= paths.source %>/*.jade'
        ],
        tasks: [
          'jade'
        ],
        options: {
          spawn: false
        }
      },

      babel: {
        files: [
          '<%= paths.source %>/**/*.js'
        ],
        tasks: [
          'babel'
        ],
        options: {
          spawn: false
        }
      },

      jadeTemplates: {
        files: [
          '<%= paths.source %>/templates/**/*.jade'
        ],
        tasks: [
          'jade'
        ],
        options: {
          spawn: false
        }
      }

    }
    // ============================
  });
  // ============================================================================


  /*
  | ============================================================================
  | Grunt : Load Task
  | ============================================================================
  */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // ============================================================================


  /*
  | ============================================================================
  | Grunt : Set Task Varaible
  | ============================================================================
  */
  var defaultTask = ['clean', 'sass', 'jade', 'babel'];
  var previewTask = ['browserSync', 'watch'];
  // ============================================================================


  /*
  | ============================================================================
  | Grunt : Set Task
  | ============================================================================
  */
  grunt.registerTask('serve', function(){
    var task = defaultTask;
    task = task.concat(previewTask);
    grunt.task.run(task);
  });


  grunt.registerTask('dist', function(){
    var distTask = defaultTask.concat(['copy']);
    grunt.task.run(distTask);
  });
  // ============================================================================
};