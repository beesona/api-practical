const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
// NOTE (NG): gulp-nodemon removed because of https://github.com/npm/npm/issues/17722
// const nodemon = require('gulp-nodemon');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    let error = false;
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on('error', () => { error = true; })
        .on('finish', () => { if (error) process.exit(1); });
    return tsResult.js
        .pipe(sourcemaps.write({
            // Return relative source map root directories per file.
            sourceRoot: function (file) {
                var sourceFile = path.join(file.cwd, file.sourceMap.file);
                return path.relative(path.dirname(sourceFile), file.cwd);
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', gulp.series(gulp.parallel('scripts'), function watching() {
    return gulp.watch('src/**/*.ts', gulp.series(['scripts']));
}));

gulp.task('assets', function copyToDist() {
    return gulp.src(JSON_FILES).pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series(gulp.parallel('watch', 'assets')));

gulp.task('scripts/assets', gulp.series(gulp.parallel('scripts', 'assets')));