Vip.Partials = (function(w, _) {
    'use strict';

    var register = function(path) {
        _.each(path, function(templateFunction, templateName) {
            if (typeof templateFunction !== 'function') {
                register(templateFunction);
            }
            Handlebars.registerPartial(templateName, templateFunction);
        });
    };

    register(__templates);

    return {
        register : register
    }

}(this, _));
