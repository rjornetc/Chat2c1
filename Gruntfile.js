module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    targetDir: './public/libs',
                    layout: 'byComponent',
                    install: true,
                    verbose: true,
                    cleanBowerDir: true
                }
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-bower-task');

};
