'use strict';
var express = require('express');
var alipay = require('../index');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

alipay.config({
    //seller_email: 'dlculinarytours@gmail.com',
    seller_email: 'alipaytest20091@gmail.com ',
    //partner: '2088421371173960',
    partner: '2088101122136241',
    key: '760bdzec6y9goq7ctyx96ezkz78287de',
    return_url: 'http://localhost:3000/'
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
    var params = req.body;
    var test = new Date();
    console.log('Body:  ',params)
    //params.out_trade_no = Date.now().toString();
    params.out_trade_no = 1;
    console.log(params.out_trade_no);
    var url = alipay.buildDirectPayURL(params);
    res.redirect(url);
});

app.get('/pay', function (req, res) {
    var url = alipay.buildDirectPayURL({
        out_trade_no: '0123456',
        subject: 'subject',
        body: 'body',
        total_fee: '1',
        currency: 'USD'
    });
    console.log(url);
    res.redirect(url);
});

app.get('/return', function (req, res) {
    var params = req.query;
    alipay.verify(params, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            if (result === true) {
                res.reply('支付成功');
                //该通知是来自支付宝的合法通知
            }
        }
    });
    res.end('');
});

app.listen(3000);
