var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var bodyParser = require('body-parser');

//payment modules
var paypal = require('paypal-rest-sdk');
var alipay = require('./direct-alipay/index');
var stripe = require('stripe')('sk_test_8s4ktjJN70i2ButwY95zwgky');

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
  'client_id': 'Aea9Q4hJZhxlfy32aECrtU00X_K1r855mZ3Vz8ojTY1IYIdJ2nplP1zgjyRyZPNQjp_P5GzpKUmmxaf8',
  'client_secret': 'ELqZP3RXjIeURlA0wqwrIonbVdnCB0LCDFDKCOvWZbfCHyi7bpfT43oSXq-9X1W-zQs2uHXmtnUSxiNb'
}

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
  //
  function checkFlag() {
    if (flag == true) {
      //console.log('Payment transaction: ', paymenDetail.transactions);
     // res.send('Payment successfully.');
    }// else res.send('Get error.');
  }
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
                      res.send('Payment and saved your booking successfully.');
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
          //flag = false;
          //checkFlag();
          res.send('Get error.');
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
          try {
            paymenDetail = payment;
            console.log('Payment detail: ', paymenDetail.transactions[0].description);
            loadTempAndSave(paymenDetail.transactions[0].description);
            //var type = typeof paymenDetail;
            //console.log('Type of: ', type);
          } 
          catch(err) {
            console.log('Error payment detail: ',err);
            res.send('Get error in try block.');
          }
          //console.log('Payment json: ',payment);
          //description = JSON.stringify(payment);
          //description = payment;
          //console.log('Bien description:  ', description.transactions[0].description);
          //res.send(description.transactions[0].description);
          //res.send(JSON.stringify(payment));
          //checkFlag();
          //res.send('Payment successfully.');
      }
  });
});
 
// Page will display when you canceled the transaction 
app.get('/paypal/cancel', function(req, res) {
  res.send("You've cancled paymet.")
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
alipay.config({
    //seller_email: 'dlculinarytours@gmail.com',
    seller_email: 'alipaytest20091@gmail.com ',
    //partner: '2088421371173960',
    partner: '2088101122136241',
    //key: 'u1k9naw5qajd90j5vmocq7dlfkkbt6cl',
    key: '760bdzec6y9goq7ctyx96ezkz78287de',
    return_url: 'http://localhost:5000/alipay/return',
    notify_url: 'http://localhost:5000/alipay/return'
});

app.post('/alipay/pay', function (req, res) {
    var data = req.body;
    console.log('Data alipay:  ',data);
    var buildObject = {
        out_trade_no: '012345678910' + data.out_trade_no.toString(),
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
                      res.send('Payment and saved your booking successfully.');
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
            res.send("You've cancled or get error");
        } else {
            console.log('Result alipay: ', result);
            loadTempAndSave(extractTempId(params.out_trade_no, 11));
            //res.send("OK");
        }
    });
});

app.post('/stripe', function(req, res) {
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
                      res.send('Payment and saved your booking successfully.');
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
        //amount: req.body.total.toString()
        amount: amount
    },
    function(err, charge) {
        if (err) {
            console.log('Error stripe: ',err);
            res.send('Get error');
        } else {
            console.log('Charge detail: ', charge);
            loadTempAndSave();
            //res.send('Payment successfully.');
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
