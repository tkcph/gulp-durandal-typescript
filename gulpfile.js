var gulp = require('gulp');
var durandal = require('gulp-durandal');
var htmlreplace = require('gulp-html-replace');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var es = require('event-stream');
var run = require('gulp-run');
var typescript = require('gulp-tsc');

gulp.task('durandal', function(){
    durandal({
        baseDir: 'app', // folder to src files
        main: 'main.js', // mail src file
        output: 'app.js', // what is going to be the resulting filename
        almond: true, // almond it
        minify: true // minify it
    })
        .pipe(gulp.dest('./build'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'app.js'
        }))
        // .pipe(filelog())
        .pipe(gulp.dest('build'));
});

gulp.task('scss', function () {



    var bootstrapCSS = gulp.src('css/bootstrap.scss')
        .pipe(sass.sync({
            includePaths: ['css/style']
        }))
        .on('error', function (err) {
            console.error('Bootstrap SCSS Error: ', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(minifycss());

    var fontAwesomeCSS = gulp.src('node_modules/font-awesome/css/font-awesome.min.css');
    
    var durandalCSS = gulp.src('node_modules/durandal/css/durandal.css').pipe(minifycss());

    var styleCSS = gulp.src('css/style.scss')
            .pipe(sass.sync({
                includePaths: ['css/style']
            }))
            .on('error', function (err) {
                console.error('Style SCSS Error: ', err.message);
            })
            .pipe(sourcemaps.write())
            .pipe(minifycss());


    var combinedCss = es.concat(bootstrapCSS, fontAwesomeCSS, durandalCSS, styleCSS).pipe(concat('css.css'));

    var fontFiles = gulp.src('node_modules/**/fonts/*', { base: 'node_modules/' });

    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('build'));
});

gulp.task('fonts', function() {
    return gulp.src([
            'node_modules/font-awesome/fonts/**/*\.ttf',
            'node_modules/font-awesome/fonts/**/*\.woff',
            'node_modules/font-awesome/fonts/**/*\.woff2',

            'node_modules/bootstrap-sass/assets/fonts/**/*\.ttf',
            'node_modules/bootstrap-sass/assets/fonts/**/*\.woff',
            'node_modules/bootstrap-sass/assets/fonts/**/*\.woff2',

            'fonts/*\.ttf',
            'fonts/*\.woff',
            'fonts/*\.woff2'])

        .pipe(gulp.dest('build/fonts'));
});

gulp.task('npm', function () {
    run('npm update').exec();  // run npm update
});

gulp.task('tsc', function(){
    gulp.src(['app/**/*.ts'])
        .pipe(typescript({
            "module": "amd",
            //"outDir": ".",
            "sourceMap": true,
            "target": "es5"
        }));
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.ts', ['tsc']);
    gulp.watch('css/**/*.scss', ['scss']);
});

gulp.task('default', ['tsc', 'durandal', 'scss', 'fonts', 'html'], function(done) {
    done();
});