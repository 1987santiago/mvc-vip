Vip.Views.Payment = Backbone.View.extend({
    tagName: 'section',
    className: 'payment',
    template: __templates.payment.main,

    initialize: function(options) {
        var that = this;

        this.itemModel = options.itemModel;

        this.model.on('change', function() {
            that.render();
        });
        options.itemModel.on('fetched', function() {
            var defaultInstallmentsPrice,
                price = that.itemModel.get('price'),
                quantity = that.model.get('default_installments_quantity'),
                interests =that.model.get('default_installments_interests');

            defaultInstallmentsPrice = parseFloat(price / quantity * interests).toFixed(2);

            that.model.set({
                "default_installments_price": defaultInstallmentsPrice
            });

            that.model.save();

            console.log('[[[[[[[[[[this.itemModel]]]]]]]]]]', that.itemModel.toJSON());
            console.log('[[[[[[[[[[this.model]]]]]]]]]]', that.model.toJSON());
        });
        options.itemModel.on('change', function() {
            that.render();
        });
        
        this.render();
    },

    render: function() {
        var model = {
            "payment": this.model.toJSON(),
            "item": this.itemModel.toJSON()
        };
        this.$el.html(this.template(model));
    },

    events: {
        "click #openPaymentCalculator": "openCalculator"
    },

    openCalculator: function(e) {
        e.preventDefault();

        var that = this,
            paymethods = new Vip.Collections.Cards;

        paymethods.fetch({
            success: function(collection, response, options) {
                var paymentCalculatorView = new Vip.Views.PaymentCalculator({
                    model: that.model,
                    itemModel: that.itemModel, 
                    collection: collection
                });
                this.$('#paymentCalculator').html(paymentCalculatorView.el);
            }
        });

    }
});