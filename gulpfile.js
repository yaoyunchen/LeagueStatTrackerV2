var gulp =          require('gulp');
var concat =        require('gulp-concat');
var uglify =        require('gulp-uglify');
var ngAnnotate =    require('gulp-ng-annotate');

var sourcemaps =    require('gulp-sourcemaps');
var plumber =       require('gulp-plumber');


gulp.task('js', function() {
  gulp.src(['public/javascripts/angularApp.js', 'public/javascripts/**/*.js'])
  .pipe(concat('public/javascripts/league-stat-tracker.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('.'));
});

gulp.task('watch', ['js'], function() {
  gulp.watch('public/javascripts/*.js', ['js']);
});


gulp.task('css', function() {
  gulp.src(['public/stylesheets/*.css', 'public/vendor/ngDialog-theme-default.css'])
  .pipe(concat('public/stylesheets/league-stat-tracker.css'))
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('.'))
});

gulp.task('watch', ['css'], function() {
  gulp.watch(['public/stylesheets/*.css', 'public/vendor/ngDialog-theme-default.css'], ['css']);
});