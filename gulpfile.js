const gulp        = require('gulp');
const runSequence = require('run-sequence');
const pump        = require('pump');

/*------------------------------------------------------------------------------------------------*\
    CSS    
\*------------------------------------------------------------------------------------------------*/
var css_src  = './src/scss/';
var css_dest = './dist/css/';

const sass   = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');


// Compile SCSS in expanded mode so it's easier to inspect the result.
gulp.task('sass', (cb) =>
    pump([
        gulp.src(css_src + '**/*.scss'),
        sass({outputStyle: 'expanded'}),
        gulp.dest(css_dest)
    ],
    cb)
);

// Then create a minified version in the output folder.
gulp.task('cssmin', (cb) =>
    pump([
        gulp.src(css_src + '**/*.css'),
        cssmin(),
        rename({extname: '.min.css'}),
        gulp.dest(css_dest)
    ],
    cb)
);

// This combined task makes it convenient to run all the steps together.
gulp.task('css', () => {
    console.log('Processing (S)CSS. See gulpfile.js for details.');
    runSequence('sass', 'cssmin');
})


/*------------------------------------------------------------------------------------------------*\
    JS    
\*------------------------------------------------------------------------------------------------*/
var js_src      = './src/js/';
var js_dest     = './dist/js/';
var js_filename = 'blox.js';

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');



gulp.task('concat_js', () =>
    gulp.src([
        js_src + '**/*.js'
    ])
    .pipe(concat(js_filename))
    .pipe(gulp.dest(js_dest))
);


gulp.task('uglify', (cb) => 
    pump([
        gulp.src(js_dest + js_filename),
        uglify(),
        rename({extname: '.min.js'}),
        gulp.dest(js_dest)
    ],
    cb)
);



// This combined task makes it convenient to run all the steps together.
gulp.task('js', () => {
    console.log('Processing js. See gulpfile.js for details.');
    runSequence('concat_js', 'uglify');
})



/*------------------------------------------------------------------------------------------------*\
    WATCHERS    
\*------------------------------------------------------------------------------------------------*/

// Watch CSS:
gulp.task('watch_css', function(){
    gulp.watch(css_src + '**/*.scss', ['css']); 
});

// Watch JS:
gulp.task('watch_js', function(){
    gulp.watch(js_src + '**/*.js', ['js']); 
});


// Watch all of the above:
gulp.task('watch_all', function(){
    gulp.watch(css_src + '**/*.scss', ['css']);
    gulp.watch(js_src + '**/*.js', ['js']); 
});

