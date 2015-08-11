Vip.Models.Payment = Backbone.Model.extend({
    urlRoot: '/payment',
    defaults: {
        "default_installments_quantity": 12,
        "default_installments_interests": 1.2
    }
});