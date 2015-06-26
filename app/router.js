var Router = Backbone.Router.extend({
    routes: {
        "": "index"
    },

    index: function() {
        console.log('index');
        // var chatRoomModel = new Chat.models.ChatRoom();
        // chatRoomModel.fetch();
        // var chatRoomView = new Chat.views.ChatRoom({model: chatRoomModel});

        // $('#app').html(chatRoomView.el);
    }
});

$(function(){
    Vip.router = new Router();
    Backbone.history.start({pushState: true});
});