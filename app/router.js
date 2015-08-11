var Router = Backbone.Router.extend({
    routes: {
        "item(:id)" : "index",
        "paymentCalculator(/:id)" : "paymentCalculator"
    },

    index: function(id) {
        var itemModel,
            itemView,
            paymentModel,
            paymentView,
            shipmentModel,
            shipmentView;

        // Load Item Component
        itemModel = new Vip.Models.Item({"id" : id});
        itemModel.fetch({
            success: function(model, response, options) {
                model.trigger('fetched');
            }
        });
        // console.log('Item Model', itemModel.toJSON());
        itemView = new Vip.Views.Item({model: itemModel});

        // Load Payment Component
        paymentModel = new Vip.Models.Payment();
        paymentModel.fetch({
            success: function(model, response, options) {
                // model.trigger('fetched', response);
            }
        });
        paymentView = new Vip.Views.Payment({
            "model": paymentModel,
            "itemModel": itemModel
        });

        $('main')
            .append(itemView.el)
            .append(paymentView.el);
    }
});

$(function(){
    Vip.router = new Router();
    Backbone.history.start();
});