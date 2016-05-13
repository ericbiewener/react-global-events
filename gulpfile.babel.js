import {exec} from 'child_process'
import gulp from 'gulp'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'


const paths = {
	entry: './src/index.js',
	entryGlob: './src/**/*.js',
	dist: './dist/',
	lib: './lib/',
	entryExamples: './examples/dev.js',
	examples: './examples/',
	bundleName: 'react-global-events',
	browserifyImportRoot: './'
}

const dialog = {
  emit: (...args) => {
  	exec(`osascript -e "display dialog \\"${args.join('\n\n')}\\""`)
  },
  getLineAndColumnString: error => (
  	error.loc && `Line: ${error.loc.line}    Column: ${error.loc.column}`
  )
}

function emitJsError(error) {
	console.log(error)
	dialog.emit(
		'JS ERROR',
		error.filename,
		dialog.getLineAndColumnString(error),
		error
	)
}

// BABEL COMPILED

function lib() {
	gulp.src(paths.entryGlob)
		.pipe(babel({
			presets: ['es2015', 'react'],
			plugins: ['transform-object-rest-spread']
		}))
		.pipe(gulp.dest(paths.lib))
}

function libWatch() {
	gulp.watch(paths.entryGlob, lib)
	lib()
}

// COMPILED, CONCATENATED, MINIFIED

function browserifyCreate(entry, bundle, ignoreReact=true) {
	const b = browserify({
		cache: {},
		packageCache: {},
		entries: entry,
		plugin: [watchify],
	})
	.transform(babelify, {
		presets: ['es2015', 'react'],
		plugins: ['transform-object-rest-spread']
	})

	if (ignoreReact) b.ignore('react')

	b.on('update', bundle)
	b.on('log', console.log)

	return b
}
 
function dist() {
	function bundle() {
		b.bundle()
			.on('error', emitJsError)
			.pipe(source(`${paths.bundleName}.js`))
			.pipe(buffer())
			.pipe(gulp.dest(paths.dist))
			.pipe(rename(`${paths.bundleName}.min.js`))
			.pipe(uglify({mangle: true}))
			.pipe(gulp.dest(paths.dist))
	}

	let b = browserifyCreate(paths.entry, bundle)
	bundle()
}

// EXAMPLES

function examples() {
	function bundle() {
		b.bundle()
			.on('error', emitJsError)
			.pipe(source('bundle.js'))
			.pipe(gulp.dest(paths.examples))
	}

	let b = browserifyCreate(paths.entryExamples, bundle, false)
	bundle()
}

gulp.task('lib', lib)
gulp.task('libWatch', libWatch)
gulp.task('dist', dist)
gulp.task('examples', examples)
gulp.task('default', ['libWatch', 'dist', 'examples'])