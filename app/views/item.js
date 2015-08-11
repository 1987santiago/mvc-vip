Vip.Views.Item = Backbone.View.extend({
    tagName: 'section',
    className: 'item',
    template: __templates.item,

    initialize: function() {
        var that = this;

        this.model.on('change', function() {
            that.render();
        });

        that.render();
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    }
});