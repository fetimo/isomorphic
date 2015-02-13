var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify');

gulp.task('scripts', function () {
    gulp.src(['app/main.js'])
        .pipe(browserify({
            debug: false,
            transform: [ 'reactify' ]
        }))
        // .pipe(uglify())
        .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['scripts']);
