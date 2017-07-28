module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['./src/scripts/**']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};
