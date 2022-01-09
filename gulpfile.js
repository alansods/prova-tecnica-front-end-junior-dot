// Adiciona os modulos instalados
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// Função do autoprefixer
function autoprefixerBuild() {
  return gulp
    .src('assets/css/*.css')
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
}

// Tarefa para iniciar o autoprefixer
gulp.task('autoprefixer', autoprefixerBuild);

// Função para iniciar o browser
function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Função de watch do Gulp
function watch() {
  gulp.watch(['assets/css/*.css']).on('change', browserSync.reload);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task(
  'default',
  gulp.parallel('watch', 'browser-sync', 'autoprefixer'),
);
