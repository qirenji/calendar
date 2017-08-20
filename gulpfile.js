var gulp = require('gulp');
var browsersync = require('browser-sync').create();

//删除dist目录下文件
var del=require('del');
gulp.task('clean',function(cb){
    return del(['dist/*'],cb);
})

//操作js文件
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var babeles2015 = require('babel-preset-es2015');

gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
        .pipe(browsersync.stream());  //文件有更新自动执行
})

//操作css文件
var cssnano = require('gulp-cssnano');//css压缩插件
// var less=require('gulp-less');//less文件编译
gulp.task('css', function() {
    gulp.src('src/css/*.css')
        // .pipe(less()) //编译less文件
        .pipe(cssnano())//css压缩
        .pipe(gulp.dest('dist/css'))
        .pipe(browsersync.stream());
});

var htmlmin = require('gulp-htmlmin');      //html压缩插件
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            //压缩html
            collapseWhitespace: true,
            //省略布尔属性的值
            collapseBooleanAttributes: true,
            //清除html注释
            removeComments: true,
            //删除所有空格作为属性值
            removeEmptyAttributes: true,
            //删除type=text/javascript
            removeScriptTypeAttributes: true,
            //删除type=text/css
            removeStyleLinkTypeAttributes: true,
            //压缩页面js
            minifyJS:true,
            //压缩页面css
            minifyCSS:true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.stream());
});



gulp.task('serve', ['clean'], function() {
    gulp.start('js','css','html');
    browsersync.init({
        port: 3000,
        server: {
            baseDir: ['dist']
        }
    });
    gulp.watch('src/js/*.js', ['js']);         //监控文件变化，自动更新
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/*.html', ['html']);
});

gulp.task('default',['serve']);