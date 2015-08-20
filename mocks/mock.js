$.mockjax({
    url: '/item/1', // url donde busca la data
    proxyType: "GET",
    proxy: './mocks/responses/item1.json'
});
$.mockjax({
    url: '/item/2',
    proxyType: "GET",
    proxy: './mocks/responses/item2.json'
});

$.mockjax({
    url: '/payment',
    proxyType: "GET",
    proxy: './mocks/responses/payment.json'
});

$.mockjax({
    url: '/cards',
    proxyType: "GET",
    proxy: './mocks/responses/cards.json'
});

$.mockjax({
    url: '/card/01',
    proxyType: "PUT"
});

$.mockjax({
    url: '/card/02',
    proxyType: "PUT"
});

// Disable Mocks
// $.mockjax.clear()