module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        wiredep: {
            task: {
                src: [
                    './public/index.html'
                ],
                directory: './public/libs/'
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-wiredep');

};
