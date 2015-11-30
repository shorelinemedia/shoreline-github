var gulp =     require('gulp'),
    less =     require('gulp-less'),
    watch =    require('gulp-watch'),
    concat =   require('gulp-concat'),
    uglify =   require('gulp-uglifyjs'),
    rename =   require('gulp-rename'),
    cleancss = require('gulp-cleancss'),
    path =     require('path'),
    reload =   require('gulp-livereload');

// Convert our LESS files to CSS
gulp.task('less', function () {
    return gulp.src(['./_src/less/app.less'])
        .pipe(less({
            paths: [ path.join(__dirname, '_src', 'less', 'inc'), path.join(__dirname, 'bower_components') ]
        }).on('error', function (err) {
            console.log(err);
        }))
        .pipe(cleancss())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('./assets/css'));
});

// Concatenate our app scripts

gulp.task('scripts', function() {
  return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './bower_components/jquery.scrollTo/jquery.scrollTo.js',
      './bower_components/bootstrap/js/modal.js',
      './_src/js/inc/shoreline-faux-input-autofill.js',
      './_src/js/app.js'
    ])
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./assets/js/'));
});

// Watch our entire project for changes
gulp.task('watch', function () {
    // Watch our LESS files
    gulp.watch('./_src/less/**/*.less', ['less']);
    // Watch our script files
    gulp.watch('./_src/js/**/*.js', ['scripts']);
});

// Watch our project by default
gulp.task('default', ['watch']);
