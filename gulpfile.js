const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create()

const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include');

// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        injectChanges: true,
        server: { baseDir: './' }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}

function styles() {
    return src('_asset/less/styles.less')
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'], grid: true
        }))
        .pipe(dest('_asset/css/'))
        .pipe(browserSync.stream())
}

function stylesBvi() {
    return src('_asset/less/styles-bvi.less')
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'], grid: true
        }))
        .pipe(dest('_asset/css/'))
        .pipe(browserSync.stream())
}

function html() {
    return src('_asset/html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(dest('./'))
        .pipe(browserSync.stream())
}

function startwatch() {

    // Мониторим файлы на изменения
    watch('_asset/less/**/*.less', styles);
    watch('_asset/less/**/*.less', stylesBvi);
    watch('_asset/html/**/*.html', html);
    watch('_asset/js/**/*.js').on('change', browserSync.reload);

}

// Экспортируем функцию browsersync() как таск browsersync.
// Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;

exports.styles = styles;
exports.stylesBvi = stylesBvi;
exports.html = html;

// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, stylesBvi, html, browsersync, startwatch);








