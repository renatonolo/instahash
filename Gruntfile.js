module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['./src/scripts/*'],
            options: {
                'esversion': 6
            }
        },
        concat: {
            dist: {
                src: ['./src/scripts/app.module.js', './src/scripts/modules/*.js', './src/scripts/factories/*.js'],
                dest: './dist/instahash.min.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    './dist/instahash.min.js': ['./dist/instahash.min.js']
                },
                options: {
                    mangle: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
