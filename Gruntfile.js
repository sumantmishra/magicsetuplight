module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });


  grunt.registerTask('removeAllContents', "Removes all files/folders of dist folder", function(){
    grunt.config('clean', {
        contents: ['dist/*']
    });
    grunt.task.run('clean');
  });

  grunt.registerTask('createFolderStructure', "Copies all subdirectories to dist folder", function(){
    grunt.config('copy', {
        main: {
            expand: true,
            cwd: 'app',
            src: '**',
            dest: 'dist/',
            filter: 'isDirectory'
        }
    });
    grunt.task.run('copy');
  });


  grunt.registerTask('minifyCSSFiles', "Minifies all CSS files", function(){
      grunt.config('cssmin', {
        target: {
          files:{
            'dist/css/style.min.css': ['app/css/style.css']
          }
        }
      });
      grunt.task.run('cssmin');
  });

  grunt.registerTask('minifyJSFiles', "Minifies all JS files", function(){
    grunt.initConfig({
      uglify: {
        my_target: {
          files: {
            'dist/js/main.min.js': ['app/js/main.js']
          }
        }
      }
    });
    grunt.task.run('uglify');
  });

  grunt.registerTask('minifyHTMLFiles', "Minifies all JS files", function(){
    var strData = grunt.file.read('app/index.html', {encoding: 'utf8'});

    objReg = /css\/style.css/gi;
    strData = strData.replace(objReg, 'css/style.min.css');

    objReg = /js\/main.js/gi;
    strData = strData.replace(objReg, 'js/main.min.js');

    grunt.file.write('dist/index.html' , strData );

    grunt.initConfig({
      htmlcompressor: {
        compile: {
          files: {
            'dist/index.html': 'dist/index.html'
          },
          options: {
            type: 'html',
            preserveServerScript: true
          }
        }
      }
    });
    grunt.task.run('htmlcompressor');
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-htmlcompressor');

  grunt.registerTask('default', ['removeAllContents', 
                                "createFolderStructure", 
                                'minifyCSSFiles', 
                                'minifyJSFiles', 
                                'minifyHTMLFiles']);

};