var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var bodyParser = require('body-parser');

//payment modules
var paypal = require('paypal-rest-sdk');
var alipay = require('./direct-alipay/index');
var stripe = require('stripe')('sk_live_BCeogHqVjkHh7UYorojzEvbU');

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
var config = {
  'mode': 'live', //sandbox or live
  'client_id': 'AXQ4a4t0mGxl02P4712YdfXY2rbZVfdmA_zEJLZ0Uf8UkW3f0HuYg70KIC2Nw_VCZQjoJudRC2_xR8nH',
  'client_secret': 'EH9UpedPdbvRHQQjdO4WMVTeablLynuSNZTK89vvzAD7EqhrKjeFJzsk_L5e7sxXbpITFSF-CKk1p19j'
};
//sandbox test
/*var config = {
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aea9Q4hJZhxlfy32aECrtU00X_K1r855mZ3Vz8ojTY1IYIdJ2nplP1zgjyRyZPNQjp_P5GzpKUmmxaf8',
  'client_secret': 'ELqZP3RXjIeURlA0wqwrIonbVdnCB0LCDFDKCOvWZbfCHyi7bpfT43oSXq-9X1W-zQs2uHXmtnUSxiNb'
};*/

paypal.configure(config);

// Page will display after payment has beed transfered successfully
app.get('/paypal/success', function(req, res) {
  console.log('Query:  ',req.query);
  console.log('Resquest body: ',req.body);
  var temp = app.models.Temp;
  var booking = app.models.Booking;
  var travellerInfo = app.models.TravellerInfo;
  var paymenDetail;
  var flag = true;
  var query = req.query;
  var execute_payment_json = {
      "payer_id": query.PayerID
  };

  function loadTempAndSave(tempId) {
      temp.findById(tempId)
        .then(function(resTemp) {
          console.log('Response temp: ', resTemp);
          travellerInfo.create([
              resTemp.travellerInfo
            ], function(errTraveller, resTraveller) {
              if (errTraveller) {
                console.log('Error Traveller: ', errTraveller);
                res.send('Get error when saved traveller info.');
              } else {
                console.log('Response traveller: ', resTraveller);
                console.log('Id of travellerInfo: ', resTraveller[0].id);
                resTemp.booking.travellerId = resTraveller[0].id;
                console.log('Traveller id of booking: ', resTemp.booking.travellerId);
                resTemp.booking.TravellerId = resTraveller[0].id;
                console.log('TravellerId uppercase: ', resTemp.booking.TravellerId);
                booking.create([
                    resTemp.booking
                  ], function(errBooking, resBooking) {
                    if (errBooking) {
                      console.log('Error booking: ', errBooking);
                      res.send('Get error when saved booking.');
                    } else {
                      console.log('Response booking: ', resBooking);
                      res.sendFile(__dirname+'/response-payment/success.html');
                    }
                });
              }
        });
      }, function(errTemp) {
          console.log('Error find temp: ', errTemp);
          res.send('Get error when find temp.');
      });
  }

  var paymentId = query.paymentId;
  console.log('Execute payment json: ', execute_payment_json);
  console.log('Payment Id : ', paymentId);
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (payment == null) console.log('Payment null');
      if (error && payment == null) {
          console.log(error.response);
          res.sendFile(__dirname+'/response-payment/un-success.html');
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
          try {
            paymenDetail = payment;
            console.log('Payment detail: ', paymenDetail.transactions[0].description);
            loadTempAndSave(paymenDetail.transactions[0].description);
          }
          catch(err) {
            console.log('Error payment detail: ',err);
            res.send('Get error in try block.');
          }
      }
  });
});

// Page will display when you canceled the transaction
app.get('/paypal/cancel', function(req, res) {
  res.sendFile(__dirname+'/response-payment/un-success.html');
});

app.post('/paypal/pay', function(req, res) {
  console.log('Request body:  ', req.body);
  //var localhost = 'http://45.32.13.121:5000';
  //var localhost = "http://localhost:5000";
  var localhost = app.get('url').replace(/\/$/, '');
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
    res.send('Get error');
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

app.post('/alipay/pay', function (req, res) {
    var baseUrl = app.get('url').replace(/\/$/, '');
    //var baseUrl = "http://45.32.13.121:5000";
    alipay.config({
    //seller_email: 'dlculinarytours@gmail.com',
    seller_email: 'alipaytest20091@gmail.com ',
    //partner: '2088421371173960',
    partner: '2088101122136241',
    //key: 'u1k9naw5qajd90j5vmocq7dlfkkbt6cl',
    key: '760bdzec6y9goq7ctyx96ezkz78287de',
    return_url: baseUrl+'/alipay/return',
    notify_url: baseUrl+'/alipay/return'
    });
    var data = req.body;
      console.log('Data alipay:  ',data);
      var buildObject = {
        out_trade_no: '0123456789' + data.out_trade_no.toString(),
        subject: 'dlculinarytours',
        body: data.description,
        total_fee: data.total,
        currency: data.currency
      };
      console.log('Data build object: ', buildObject);
      var url = alipay.buildDirectPayURL(buildObject);
      console.log(url);
      res.send(url);
});

app.get('/alipay/return', function (req, res) {
    var params = req.query;
    console.log('Params query: ',params);
    var temp = app.models.Temp;
    var booking = app.models.Booking;
    var travellerInfo = app.models.TravellerInfo;

    function loadTempAndSave(tempId) {
      temp.findById(tempId)
        .then(function(resTemp) {
          console.log('Response temp: ', resTemp);
          travellerInfo.create([
              resTemp.travellerInfo
            ], function(errTraveller, resTraveller) {
              if (errTraveller) {
                console.log('Error Traveller: ', errTraveller);
                res.send('Get error when saved traveller info.');
              } else {
                console.log('Response traveller: ', resTraveller);
                console.log('Id of travellerInfo: ', resTraveller[0].id);
                resTemp.booking.travellerId = resTraveller[0].id;
                console.log('Traveller id of booking: ', resTemp.booking.travellerId);
                resTemp.booking.TravellerId = resTraveller[0].id;
                console.log('TravellerId uppercase: ', resTemp.booking.TravellerId);
                booking.create([
                    resTemp.booking
                  ], function(errBooking, resBooking) {
                    if (errBooking) {
                      console.log('Error booking: ', errBooking);
                      res.send('Get error when saved booking.');
                    } else {
                      console.log('Response booking: ', resBooking);
                      res.sendFile(__dirname+'/response-payment/success.html');
                    }
                });
              }
        });
      }, function(errTemp) {
          console.log('Error find temp: ', errTemp);
          res.send('Get error when find temp.');
      });
    }
    function extractTempId(data, basicLength) {
      var result='';
      for (var i=basicLength + 1; i<data.length ; i++) {
        result += data[i];
      }
      console.log('Result tempId: ', result);
      return result;
    }
    alipay.verify(params, function (err, result) {
        if (err) {
            console.error('Error alipay:', err);
            res.sendFile(__dirname+'/response-payment/un-success.html');
        } else {
            console.log('Result alipay: ', result);
            loadTempAndSave(extractTempId(params.out_trade_no, 9));
            //res.send("OK");
        }
    });
});
app.get('/stripe/success', function(req, res) {
  res.sendFile(__dirname+'/response-payment/success.html');
});

app.get('/stripe/error', function(req, res) {
  res.sendFile(__dirname+'/response-payment/un-success.html');
});

app.post('/stripe', function(req, res) {
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('baseUrl: ', baseUrl);
    console.log('Resquest body stripe: ',req.body);
    var stripeToken = req.body.stripeToken;
    var amount = req.body.total * 100;
    console.log('Amount: ', amount);
    var temp = app.models.Temp;
    var booking = app.models.Booking;
    var travellerInfo = app.models.TravellerInfo;
    //save info from temp
    function loadTempAndSave() {
      temp.findById(req.body.tempId)
        .then(function(resTemp) {
          console.log('Response temp: ', resTemp);
          travellerInfo.create([
              resTemp.travellerInfo
            ], function(errTraveller, resTraveller) {
              if (errTraveller) {
                console.log('Error Traveller: ', errTraveller);
                res.send('Get error when saved traveller info.');
              } else {
                console.log('Response traveller: ', resTraveller);
                console.log('Id of travellerInfo: ', resTraveller[0].id);
                resTemp.booking.travellerId = resTraveller[0].id;
                console.log('Traveller id of booking: ', resTemp.booking.travellerId);
                resTemp.booking.TravellerId = resTraveller[0].id;
                console.log('TravellerId uppercase: ', resTemp.booking.TravellerId);
                booking.create([
                    resTemp.booking
                  ], function(errBooking, resBooking) {
                    if (errBooking) {
                      console.log('Error booking: ', errBooking);
                      res.send('Get error when saved booking.');
                    } else {
                      console.log('Response booking: ', resBooking);
                      res.send(baseUrl+'/stripe/success');
                    }
                });
              }
        });
      }, function(errTemp) {
          console.log('Error find temp: ', errTemp);
          res.send('Get error when find temp.');
      });
    }
    stripe.charges.create({
        card: stripeToken,
        currency: req.body.currency,
        amount: amount
    },
    function(err, charge) {
        if (err) {
            console.log('Error stripe: ',err);
            res.send(baseUrl+'/stripe/error');
        } else {
            console.log('Charge detail: ', charge);
            loadTempAndSave();
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
