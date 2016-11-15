var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var bodyParser = require('body-parser');
var paypal = require('paypal-rest-sdk');

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
  "port" : 5000,
  "api" : {
    "host" : "api.paypal.com",
    "port" : "",            
    "client_id" : "AdehWUEjD58hlKl34CZFPvyWf2OrXbyP_4ePHU_GYuqyLI0xn0pSv0s4_cbCkhQQ93HHeQuFPuM_B8XR",  // your paypal application client id
    "client_secret" : "EMGLyYVYYuN3CsuL754G1GJk_fF1YwPyBRyJqjnTCMmDHoiosCuRo-WX6Nz81XCy561GcAGk-oMGRNOe" // your paypal application secret id
  }
}

paypal.configure(config.api);

// Page will display after payment has beed transfered successfully
app.get('/success', function(req, res) {
  res.send("Payment transfered successfully.");
});
 
// Page will display when you canceled the transaction 
app.get('/cancel', function(req, res) {
  res.send("Payment canceled successfully.");
});

app.get('/test', function(req, res) {
   res.sendFile(__dirname+'/index.html');
});

app.get('/paypal', function(req, res) {
   res.sendFile(__dirname+'/index.html');
});

app.post('/paypal/pay', function(req, res) {
  console.log('Request body:  ', req.body);
  var localhost = 'http://45.32.13.121:5000';
  //var localhost = "http://localhost:3000";
  //payment custom config
  var payment = {
    "intent": "sale",
    "payer": {
    "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": localhost+"/success",
      "cancel_url": localhost+"/cancel"
    },
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

app.post('/paycard', function(req,res) {
  console.log('Body Request:  ', req.body);
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "credit_card",
        "funding_instruments": [{
            "credit_card": {
                "type": req.body.type,
                "number": req.body.number,
                "expire_month": req.body.expire_month,
                "expire_year": req.body.expire_year,
                "cvv2": req.body.cvv2,
                "first_name": req.body.first_name, // bat buoc
                "last_name": req.body.last_name,   //bat buoc
                "billing_address": {
                    "line1": req.body.line1,
                    "city": req.body.city,
                   // "state": req.body.state,
                    "postal_code": req.body.postal_code,
                    "country_code": req.body.country_code
                }
            }
        }]
    },
    "transactions": [{
        "amount": {
            "total": req.body.total,
            "currency": req.body.currency,
        },
        "description": req.body.description
    }]
  };
  /*var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "credit_card",
        "funding_instruments": [{
            "credit_card": {
                "type": "visa",
                "number": "4032034567632909",
                "expire_month": "12",
                "expire_year": "2021",
                "cvv2": "123",
                "first_name": "Hieu",
                "last_name": "Vecto",
                "billing_address": {
                    "line1": "52 N Main ST",
                    "city": "Da Nang",
                    "state": "OH",
                    "postal_code": "43210",
                    "country_code": "VN"
                }
            }
        }]
    },
    "transactions": [{
        "amount": {
            "total": "1000",
            "currency": "USD",
            "details": {
                "subtotal": "998",
                "tax": "1",
                "shipping": "1"
            }
        },
        "description": "This is the payment of hieuvecto."
    }]
  };*/
  console.log('Create payment:   ', create_payment_json.payer.funding_instruments[0].credit_card);
  console.log('Create payment 2: ', create_payment_json.transactions[0]);
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        console.log(error);
        throw error;
        res.send(error);
    } else {
        console.log("successfully");
        console.log(payment);
        res.send('successfully');
    }
  });
});

app.post('/paynow', function(req, res) {
  var localhost = 'http://localhost:3000';
   // paypal payment configuration.
  var payment = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": localhost+"/success",
    "cancel_url": localhost+"/cancel"
  },
  "transactions": [{
    "amount": {
      "total": "100.00",
      "currency":  "USD"
    },
    "description": "req.body.description"
  }]
};
 
  paypal.payment.create(payment, function (error, payment) {
  if (error) {
    console.log(error);
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
      res.redirect(redirectUrl);
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
