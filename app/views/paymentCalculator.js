Vip.Views.PaymentCalculator = Backbone.View.extend({
    tagName: 'div',
    className: 'payment-calculator',
    template: __templates.payment.calculator,
    changedData: {},

    initialize: function(options) {
        this.itemModel = options.itemModel;
        this.render();
    },

    render: function() {
        this.$el.html(this.template({
            "paymethods": this.collection.toJSON(), 
            "model": this.model.toJSON(),
            "itemModel": this.itemModel.toJSON()
        }));
    },

    events: {
        "change #card": "changeCardSelected",
        "change #installmentsQuantity": "changeInstallmentsSelected",
        "click #acceptPaymentCalculate": "changePayMethods",
    },

    changeCardSelected: function(e) {
        var paymethodSelected = this.collection.get(e.currentTarget.value).toJSON();
        this.changedData['selected_card'] = {
            "id": paymethodSelected.id,
            "name": paymethodSelected.name
        };
        this.loadInstallmentsOptions(paymethodSelected);
    },

    loadInstallmentsOptions: function(options) {
        var $select = this.$('#installmentsQuantity');
        $select.html('');
        _.each(options.installments, function(option){
            $select.append('<option value="' + option.qty + '">' + option.qty + '</option>');
        });
    },

    changeInstallmentsSelected: function(e) {
        var price = this.calculateInstallmentsPrice(e.currentTarget.value);
        this.changedData['selected_quantity'] = e.currentTarget.value;
        this.changedData['selected_price'] = price;
        this.updateInstallmentsPrice(price);
    },

    calculateInstallmentsPrice: function(num) {
        var price = this.itemModel.get('price'),
            cardData = this.collection.get($('#card').val()).toJSON(),
            installments = cardData.installments,
            fee = _.find(installments, function(data) { 
                return data.qty === +num; 
            }),
            interests = fee.interests;

        price = price / +num * interests;
        price = parseFloat(price).toFixed(2);

        return price;
    },

    updateInstallmentsPrice: function(price) {
        $('#installmentsPrice').html('$' + price);
    },

    changePayMethods: function(e) {
        e.preventDefault();

        console.log('this.changedData', this.changedData);
        this.model.set(this.changedData);
        this.model.save();

        this.remove();
    }
});