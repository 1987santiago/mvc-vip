Vip.Models.Item = Backbone.Model.extend({
    urlRoot: '/item',
    defaults: {
        'id': null,
        'title': null,
        'condition': null, // nuevo || usado
        'price': null,
        'categoryId': null,
        'permalink': null,
        'pictures': null
    },

    initialize: function() {
        this.on('change', function() {
            // console.log('Item Model has been changed' );
        });
    }
});