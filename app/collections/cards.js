Vip.Collections.Cards = Backbone.Collection.extend({
    url: '/cards',
    model: Vip.Models.Card,
    defaults: null,

    initialize: function() {
        this.on('change', function(e) {});
    }
});