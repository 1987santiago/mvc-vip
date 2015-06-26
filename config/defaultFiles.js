// default files
var mobile,
    desktop;

mobile = {
    'js': [
        './node_modules/jQuery/dist/jquery.js',
        './node_modules/underscore/underscore.js',
        './node_modules/backbone/backbone.js',
        './app/app.js',
        './app/router.js'
    ],
    'css': [
        './node_modules/chico/dist/mobile/chico.css'
    ]
};

desktop = {
    'js': [
        './node_modules/jQuery/dist/jquery.js',
        './node_modules/underscore/underscore.js',
        './node_modules/backbone/backbone.js',
        './app/app.js',
        './app/router.js'
    ],
    'css': [
        './node_modules/chico/dist/ui/chico.css'
    ]
};

/*
 * Expose
 */
exports.mobile = mobile;
exports.desktop = desktop;