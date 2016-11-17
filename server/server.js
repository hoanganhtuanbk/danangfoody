var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var bodyParser = require('body-parser');
//payment modules
var paypal = require('paypal-rest-sdk');
var alipay = require('./direct-alipay/index');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// paypal auth configuration
/*var config = {
  'mode': 'live', //sandbox or live
  'client_id': 'AXQ4a4t0mGxl02P4712YdfXY2rbZVfdmA_zEJLZ0Uf8UkW3f0HuYg70KIC2Nw_VCZQjoJudRC2_xR8nH',
  'client_secret': 'EH9UpedPdbvRHQQjdO4WMVTeablLynuSNZTK89vvzAD7EqhrKjeFJzsk_L5e7sxXbpITFSF-CKk1p19j'
}*/
//sandbox test
var config = {
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AYpyXQG8Hs0TtK66dIU6xvzQ1J6uG2DlHuwCGsduR2YUjL9aVq-m-hoeVRZzfyYKtzPDUR-ZKtiiUF7N',
  'client_secret': 'EHLCgnANZGt_Z5QJzosKJMxkz_-PVfpr72eeD2cS8u1Gfu22aQXclLLcVBduDP7FIwF7Ii2iNqTPhr-w'
}

paypal.configure(config);

// Page will display after payment has beed transfered successfully
app.get('/paypal/success', function(req, res) {
  console.log('Query:  ',req.query);
  var query = req.query;
  var execute_payment_json = {
      "payer_id": query.PayerID
  };

  var paymentId = query.paymentId;

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          res.send('Get error.');
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
           res.send('Payment successfully.');
      }
  });
});
 
// Page will display when you canceled the transaction 
app.get('/paypal/cancel', function(req, res) {
  res.send("You've cancled paymet.")
});

app.get('/test', function(req, res) {
   res.sendFile(__dirname+'/index.html');
});

app.get('/paypal', function(req, res) {
   res.sendFile(__dirname+'/index.html');
});

app.post('/paypal/pay', function(req, res) {
  console.log('Request body:  ', req.body);
  //var localhost = 'http://45.32.13.121:5000';
  var localhost = "http://localhost:5000";
  //payment custom config
  var payment = {
    "intent": "sale",
    "payer": {
    "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": localhost+"/paypal/success",
      "cancel_url": localhost+"/paypal/cancel"
    },
    //"custom": req.body.custom,
    "transactions": [{
      "amount": {
        "total": parseInt(req.body.total),
        "currency":  req.body.currency
      },
      "description": req.body.description
    }]
  };
  //
  console.log('Payment goc la: ', payment);
  console.log('')
  //
  paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
    throw error;
  } else {
      if(payment.payer.payment_method === 'paypal') {
        req.paymentId = payment.id;
        var redirectUrl;
        console.log(payment);
        for(var i=0; i < payment.links.length; i++) {
          var link = payment.links[i];
          if (link.method === 'REDIRECT') {
          redirectUrl = link.href;
          }
        }
        console.log('redirect la:    ',redirectUrl);
        res.send(redirectUrl);
      }
    }
  });
    
});
//alipay ...
alipay.config({
    seller_email: 'dlculinarytours@gmail.com',
    //seller_email: 'alipaytest20091@gmail.com ',
    partner: '2088421371173960',
    //partner: '2088101122136241',
    //key: '760bdzec6y9goq7ctyx96ezkz78287de',
    key: 'u1k9naw5qajd90j5vmocq7dlfkkbt6cl',
    return_url: 'http://localhost:5000/alipay/return'
});

app.post('/alipay/pay', function (req, res) {
    var data = req.body;
    console.log('Data alipay:  ',data);
    var url = alipay.buildDirectPayURL({
        out_trade_no: '0123456',
        subject: 'dlculinarytours',
        body: data.description,
        total_fee: data.total,
        currency: data.currency
    });
    console.log(url);
    res.send(url);
});

app.get('/alipay/return', function (req, res) {
    var params = req.query;
    alipay.verify(params, function (err, result) {
        if (err) {
            console.error(err);
            res.send("You've cancled or get error");
        } else {
            if (result === true) {
                console.log('Result:  ', result);
                res.send('Pay by alipay successfully.');
                //该通知是来自支付宝的合法通知
            }
        }
    });
});



// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
