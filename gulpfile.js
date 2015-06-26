var path = require('path'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    merge = require('arr-merge'),

    /**
     * Routes
     */
    src = {
        'build':{
            'styles': './build/styles/',
            'scripts': './build/javascripts/',
            'tmpl': './build/tmpl/',
            'images': './build/images/',
            'fonts': './build/fonts/'
        },
        'dist':{
            'styles': './dist/styles/',
            'scripts': './dist/javascripts/',
            'tmpl': './dist/tmpl/',
            'images': './dist/images/',
            'fonts': './dist/fonts/'
        }
    },

    assets = {
        'default': require('./config/defaultFiles'),
        'vip': require('./config/vipFiles')
    },

    bundles = {
        js: {
            'vipMobile': merge(assets.default.mobile.js, assets.vip.mobile.js),
            'vipDesktop': merge(assets.default.desktop.js, assets.vip.desktop.js)
        },
        css: {
            'vipMobile': merge(assets.default.mobile.css, assets.vip.mobile.css),
            'vipDesktop': merge(assets.default.desktop.css, assets.vip.desktop.css)
        },
        tmpl: {
            'vipMobile': assets.vip.mobile.tmpl,
            'vipDesktop': assets.vip.desktop.tmpl
        }
    };

/**
 * Tasks config
 */
gulp.task('tmplBuild', function(){
    gulp.src('./app/templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: '__templates',
            noRedeclare: true, // Avoid duplicate declarations 
        }))
        .pipe(concat('Tmpl.js'))
        .pipe(gulp.dest(src.build.tmpl));
});

gulp.task('images', function() {
    return gulp.src('./app/assets/images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(src.build.images))
        .pipe(gulp.dest(src.dist.images));
});

gulp.task('fonts', function() {
    return gulp.src('./app/assests/fonts/*')
        .pipe(gulp.dest(src.build.fonts))
        .pipe(gulp.dest(src.dist.fonts))
});


// Build
gulp.task('jsBuild', function() {
    Object.keys(bundles.js).forEach(function(bundle) {
        return gulp.src(bundles.js[bundle])
            .pipe(concat('scripts.js'))
            .pipe(size())
            .pipe(gulp.dest(src.build.scripts))
    });
});

gulp.task('cssBuild', function() {
    Object.keys(bundles.css).forEach(function(bundle) {
        return gulp.src(bundles.css[bundle])
            .pipe(sass({
                style: 'expanded'
            }).on('error', sass.logError))
            .pipe(concat('styles.css'))
            .pipe(gulp.dest(src.build.styles))
    });
});


// Dist
gulp.task('jsDist', function() {
    return gulp.src(src.build.scripts + '*.js')
        .pipe(foreach(function(stream, file){
            
            return stream
                .pipe(uglify())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(src.dist.scripts));
        }));
});

gulp.task('cssDist', function() {
    return gulp.src(src.build.styles + '*.css')
        .pipe(foreach(function(stream, file){
            
            return stream
                .pipe(minifyCSS())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(src.dist.styles))
        }));
});


gulp.task('build', ['jsBuild', 'cssBuild', 'fonts', 'images']);
gulp.task('dist', ['jsDist', 'cssDist', 'fonts', 'images']);


gulp.task('watch', function() {
    gulp.start('build')
    gulp.watch(['./app/styles/**/*.+(scss|css)'], ['cssBuild'])
    gulp.watch(['./app/assets/images/*'], ['images'])
    gulp.watch(['./app/**/*.js', 'gulpfile.js'], ['jsBuild'])
});