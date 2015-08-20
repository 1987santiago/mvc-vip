Vip.Views.PaymentCalculator = Backbone.View.extend({
    tagName: 'div',
    className: 'payment-calculator',
    template: __templates.payment.calculator,
    changedData: {},
    lastSelected: null,

    initialize: function(options) {
        var that = this;

        this.itemModel = options.itemModel;
        
        this.collection.on('change', function() {
            that.render();
        });
        this.render();
        this.initializeCalculator(18);
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

    initializeCalculator: function(qty) {
        var selectedInstallments,
            installmentsPrice;

        this.lastSelected = this.lastSelected || this.collection.get("01");

        _.each(this.lastSelected.get('installments'), function(opt) {
            if (opt.qty == qty) {
                selectedInstallments = opt;
            }
        });

        installmentsPrice = this.setCalculatedInstallmentsPrice(selectedInstallments);
        this.lastSelected.set({"selected_installments_price": installmentsPrice});
        this.lastSelected.save();
    },

    changeCardSelected: function(e) {
        var paymethodSelectedModel = this.collection.get(e.currentTarget.value),
            paymethodSelected = paymethodSelectedModel.toJSON();
        
        this.changedData['selected_card'] = {
            "id": paymethodSelected.id,
            "name": paymethodSelected.name
        };
        
        this.lastSelected.set({ "selected": false });
        this.lastSelected.save();
    
        paymethodSelectedModel.set({ "selected": true });
        paymethodSelectedModel.save();

        // Guardamos el item como ultimo seleccionado
        this.lastSelected = paymethodSelectedModel;

        this.initializeCalculator(paymethodSelected.installments[0].qty);
    },

    changeInstallmentsSelected: function(e) {
        // obtener el medio de pago seleccionado
        var selectedPaymethodInstallments = this.lastSelected.get('installments'),
            selectedInstallments,
            installmentsPrice;

        _.each(this.lastSelected.get('installments'), function(opt) {
            if (opt.qty == e.currentTarget.value) {
                selectedInstallments = opt;
            }
        });

        // calcular el precio por cuota
        installmentsPrice = this.itemModel.get('price') / selectedInstallments.qty * selectedInstallments.interests;
        installmentsPrice = parseFloat(installmentsPrice).toFixed(2);

        this.lastSelected.set({"selected_installments_price": installmentsPrice});
        this.lastSelected.save();

        this.changedData['selected_quantity'] = selectedInstallments.qty;
        this.changedData['selected_price'] = installmentsPrice;
    },

    setCalculatedInstallmentsPrice: function(installmentsData) {
        return parseFloat(this.itemModel.get('price') / installmentsData.qty * installmentsData.interests).toFixed(2);
    },

    changePayMethods: function(e) {
        e.preventDefault();

        this.model.set(this.changedData);
        this.model.save();

        this.remove();
    }
});