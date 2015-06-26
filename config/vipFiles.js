// vipFiles.js
var mobile,
    desktop,
    tmpl;

mobile = {
    'js': [
        './app/views/*.js'
    ],
    'css': [
        './app/styles/**/*.scss'
    ],
    'tmpl': []
};

desktop = {
    'js': [],
    'css': [],
    'tmpl': []
};

/*
 * Expose
 */
exports.mobile = mobile;
exports.desktop = desktop;