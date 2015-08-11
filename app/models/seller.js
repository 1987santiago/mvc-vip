Vip.Models.Seller = Backbone.Model.extend({
    url:'/seller',
    defaults: {
        'id': null,
        'nickname': null,
        'userType': null,
        'permalink': null,
        'points': null,
        'reputation': null,
        'status': null
    }
});