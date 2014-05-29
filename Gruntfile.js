module.exports = function (grunt) {

  grunt.initConfig({
    clean: ["dist"],
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    uglify: {
      article: {
        options: {
          mangle: true
        },
        files: {
          'dist/kitty.min.js': [
            'src/kitty.js',
            'src/model.js',
            'src/view.js'
          ]
        }
      }
    },
    anonymous: {
      dist : {
        files: {
          'dist/kitty.min.js': 'dist/kitty.min.js'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-anonymous');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask("test", ['karma']);
  grunt.registerTask('build', [
    'jshint', 'clean', 'test', 'uglify', 'anonymous'
  ]);
  grunt.registerTask("default", ['build']);

};