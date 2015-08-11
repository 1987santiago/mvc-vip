$.mockjax({
    url: '/item/1', // url donde busca la data
    proxyType: "GET",
    proxy: '/mocks/responses/item1.json'
});
$.mockjax({
    url: '/item/2', // url donde busca la data
    proxyType: "GET",
    proxy: '/mocks/responses/item2.json'
});

$.mockjax({
    url: '/payment', // url donde busca la data
    proxyType: "GET",
    proxy: '/mocks/responses/payment.json'
});

$.mockjax({
    url: '/cards', // url donde busca la data
    proxyType: "GET",
    proxy: '/mocks/responses/cards.json'
});

$.mockjax({
    url: '/shipment', // url donde busca la data
    proxyType: "GET",
    proxy: '/mocks/responses/shipment.json'
});

// Disable Mocks
// $.mockjax.clear()