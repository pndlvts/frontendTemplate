var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
gulp.task("sass", function () {
    return gulp.src("sass/*.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on("error", sass.logError))
        .pipe(gulp.dest("css/"));
});

gulp.task("pug", function () {
    return gulp.src("pug/*.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("./"));

});

gulp.task('concat', function () {
    return gulp.src('blocks/**/*.js') // путь к папке со скриптами
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('bundle.js')) // в какой файл объединить
        .pipe(uglify())
        .pipe(gulp.dest('js/'));
});

gulp.task('watch', function () {
    gulp.watch('sass/*.scss', gulp.series('sass'));
    gulp.watch('pug/*.pug', gulp.series('pug'));
    gulp.watch('blocks/**/*.js', gulp.series('concat'));
});
