import gulp from 'gulp'
import {initializeSettings, gulpTask, jsTasks} from 'gulp-grab-bag'


initializeSettings({
	paths: {
		entry: './src/index.js',
		entryGlob: './src/**/*.js',
		dist: './dist/',
		lib: './lib/',
		entryExamples: './examples/dev.js',
		examples: './examples/',
		bundleName: 'react-global-events',	
	}
})

let lib = jsTasks.lib(),
    dist = jsTasks.dist('react'),
    examples = jsTasks.examples()

gulp.task('default', () => {
	lib()
	dist()
	examples()
})

gulp.task('ok', () => {})