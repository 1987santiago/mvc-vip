// vipFiles.js
var mobile,
    desktop,
    tmpl;

mobile = {
    'js': [
        './app/utils/*.js',
        './app/models/*.js',
        './app/collections/*.js',
        './app/views/*.js',
        './app/router.js',
        './mocks/**/*.js'
    ],
    'css': [
        './app/styles/*.css'
    ],
    'tmpl': [
        './app/templates/*.hbs'
    ],
    'images': []
};

desktop = {
    'js': [],
    'css': [],
    'tmpl': [],
    'images': []
};

/*
 * Expose
 */
exports.mobile = mobile;
exports.desktop = desktop;