// default files
var mobile,
    desktop;

mobile = {
    'js': [
        './node_modules/jQuery/dist/jquery.js',
        './node_modules/underscore/underscore.js',
        './node_modules/backbone/backbone.js',
        './node_modules/gulp-handlebars/node_modules/handlebars/dist/handlebars.js',
        './node_modules/jquery-mockjax/dist/jquery.mockjax.min.js',
        './build/templates/templates.js',
        './app/app.js'
    ],
    'css': [
        './node_modules/normalize.css/normalize.css',
        './node_modules/chico/dist/mobile/chico.css',
        './node_modules/Navigation/dist/mercadolibre/navigation__small.css'
    ],
    'images': [
        './app/assets/images/*'
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
    ],
    'images': []
};

/*
 * Expose
 */
exports.mobile = mobile;
exports.desktop = desktop;