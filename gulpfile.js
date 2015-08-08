var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./js/app.jsx'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .on('error', function(err) {
            console.log('Error with compiling components', err.message);
        })
        .pipe(source('bundle.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./client/'));

        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .on('error', function(err) {
            console.log('Error with compiling components', err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./client/'));
});


// Just running the two tasks
gulp.task('default', ['browserify']);
