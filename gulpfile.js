var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');

gulp.task('default', () => {
  nodemon({
    script: './app.js',
    ext: 'js',
    env: {
      PORT: 8000
    },
    ignore: [
      './node_modules/**'
    ]
  })
  .on('restart', () => {
    console.log('restarting');
  });
});

gulp.task('test', function() {
  env({ vars: { ENV: 'Test' }});
  gulp.src('tests/*.js', { read: false })
    .pipe(mocha({ reporter: 'nyan' }));
});