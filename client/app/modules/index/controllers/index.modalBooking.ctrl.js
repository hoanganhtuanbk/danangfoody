'use strict';
angular
  .module('com.module.index')
  .controller('modal3Step', function($scope,$modal,$modalInstance,CoreService,$rootScope,$http,$window,Tour, Temp, TravellerInfo, Booking, ValidateServices, $filter){
    //translate
    var $translate = $filter('translate');
    //Initialize Data
    console.log('Base url: ', CoreService.env.siteUrl);
    if ($rootScope.from) {
      console.log('From:   ', $rootScope.from);
      $scope.isFrom = 'col-md-4';
    } else $scope.isFrom = 'col-md-8';
    console.log('' == null);
    console.log('Check controller');
    $scope.countries = [null,{"id":"AF","text":"Afghanistan"},{"id":"AX","text":"Åland Islands"},{"id":"AL","text":"Albania"},{"id":"DZ","text":"Algeria"},{"id":"AS","text":"American Samoa"},{"id":"AD","text":"Andorra"},{"id":"AO","text":"Angola"},{"id":"AI","text":"Anguilla"},{"id":"AQ","text":"Antarctica"},{"id":"AG","text":"Antigua and Barbuda"},{"id":"AR","text":"Argentina"},{"id":"AM","text":"Armenia"},{"id":"AW","text":"Aruba"},{"id":"AU","text":"Australia"},{"id":"AT","text":"Austria"},{"id":"AZ","text":"Azerbaijan"},{"id":"BS","text":"Bahamas"},{"id":"BH","text":"Bahrain"},{"id":"BD","text":"Bangladesh"},{"id":"BB","text":"Barbados"},{"id":"BY","text":"Belarus"},{"id":"BE","text":"Belgium"},{"id":"BZ","text":"Belize"},{"id":"BJ","text":"Benin"},{"id":"BM","text":"Bermuda"},{"id":"BT","text":"Bhutan"},{"id":"BO","text":"Bolivia"},{"id":"BQ","text":"Bonaire"},{"id":"BA","text":"Bosnia and Herzegovina"},{"id":"BW","text":"Botswana"},{"id":"BV","text":"Bouvet Island"},{"id":"BR","text":"Brazil"},{"id":"IO","text":"British Indian Ocean Territory"},{"id":"VG","text":"British Virgin Islands"},{"id":"BN","text":"Brunei"},{"id":"BG","text":"Bulgaria"},{"id":"BF","text":"Burkina Faso"},{"id":"BI","text":"Burundi"},{"id":"KH","text":"Cambodia"},{"id":"CM","text":"Cameroon"},{"id":"CA","text":"Canada"},{"id":"CV","text":"Cape Verde"},{"id":"KY","text":"Cayman Islands"},{"id":"CF","text":"Central African Republic"},{"id":"TD","text":"Chad"},{"id":"CL","text":"Chile"},{"id":"CN","text":"China"},{"id":"CX","text":"Christmas Island"},{"id":"CC","text":"Cocos (Keeling) Islands"},{"id":"CO","text":"Colombia"},{"id":"KM","text":"Comoros"},{"id":"CG","text":"Republic of the Congo"},{"id":"CD","text":"DR Congo"},{"id":"CK","text":"Cook Islands"},{"id":"CR","text":"Costa Rica"},{"id":"HR","text":"Croatia"},{"id":"CU","text":"Cuba"},{"id":"CW","text":"Curaçao"},{"id":"CY","text":"Cyprus"},{"id":"CZ","text":"Czech Republic"},{"id":"DK","text":"Denmark"},{"id":"DJ","text":"Djibouti"},{"id":"DM","text":"Dominica"},{"id":"DO","text":"Dominican Republic"},{"id":"EC","text":"Ecuador"},{"id":"EG","text":"Egypt"},{"id":"SV","text":"El Salvador"},{"id":"GQ","text":"Equatorial Guinea"},{"id":"ER","text":"Eritrea"},{"id":"EE","text":"Estonia"},{"id":"ET","text":"Ethiopia"},{"id":"FK","text":"Falkland Islands"},{"id":"FO","text":"Faroe Islands"},{"id":"FJ","text":"Fiji"},{"id":"FI","text":"Finland"},{"id":"FR","text":"France"},{"id":"GF","text":"French Guiana"},{"id":"PF","text":"French Polynesia"},{"id":"TF","text":"French Southern and Antarctic Lands"},{"id":"GA","text":"Gabon"},{"id":"GM","text":"Gambia"},{"id":"GE","text":"Georgia"},{"id":"DE","text":"Germany"},{"id":"GH","text":"Ghana"},{"id":"GI","text":"Gibraltar"},{"id":"GR","text":"Greece"},{"id":"GL","text":"Greenland"},{"id":"GD","text":"Grenada"},{"id":"GP","text":"Guadeloupe"},{"id":"GU","text":"Guam"},{"id":"GT","text":"Guatemala"},{"id":"GG","text":"Guernsey"},{"id":"GN","text":"Guinea"},{"id":"GW","text":"Guinea-Bissau"},{"id":"GY","text":"Guyana"},{"id":"HT","text":"Haiti"},{"id":"HM","text":"Heard Island and McDonald Islands"},{"id":"VA","text":"Vatican City"},{"id":"HN","text":"Honduras"},{"id":"HK","text":"Hong Kong"},{"id":"HU","text":"Hungary"},{"id":"IS","text":"Iceland"},{"id":"IN","text":"India"},{"id":"ID","text":"Indonesia"},{"id":"CI","text":"Ivory Coast"},{"id":"IR","text":"Iran"},{"id":"IQ","text":"Iraq"},{"id":"IE","text":"Ireland"},{"id":"IM","text":"Isle of Man"},{"id":"IL","text":"Israel"},{"id":"IT","text":"Italy"},{"id":"JM","text":"Jamaica"},{"id":"JP","text":"Japan"},{"id":"JE","text":"Jersey"},{"id":"JO","text":"Jordan"},{"id":"KZ","text":"Kazakhstan"},{"id":"KE","text":"Kenya"},{"id":"KI","text":"Kiribati"},{"id":"KW","text":"Kuwait"},{"id":"KG","text":"Kyrgyzstan"},{"id":"LA","text":"Laos"},{"id":"LV","text":"Latvia"},{"id":"LB","text":"Lebanon"},{"id":"LS","text":"Lesotho"},{"id":"LR","text":"Liberia"},{"id":"LY","text":"Libya"},{"id":"LI","text":"Liechtenstein"},{"id":"LT","text":"Lithuania"},{"id":"LU","text":"Luxembourg"},{"id":"MO","text":"Macau"},{"id":"MK","text":"Macedonia"},{"id":"MG","text":"Madagascar"},{"id":"MW","text":"Malawi"},{"id":"MY","text":"Malaysia"},{"id":"MV","text":"Maldives"},{"id":"ML","text":"Mali"},{"id":"MT","text":"Malta"},{"id":"MH","text":"Marshall Islands"},{"id":"MQ","text":"Martinique"},{"id":"MR","text":"Mauritania"},{"id":"MU","text":"Mauritius"},{"id":"YT","text":"Mayotte"},{"id":"MX","text":"Mexico"},{"id":"FM","text":"Micronesia"},{"id":"MD","text":"Moldova"},{"id":"MC","text":"Monaco"},{"id":"MN","text":"Mongolia"},{"id":"ME","text":"Montenegro"},{"id":"MS","text":"Montserrat"},{"id":"MA","text":"Morocco"},{"id":"MZ","text":"Mozambique"},{"id":"MM","text":"Myanmar"},{"id":"NA","text":"Namibia"},{"id":"NR","text":"Nauru"},{"id":"NP","text":"Nepal"},{"id":"NL","text":"Netherlands"},{"id":"NC","text":"New Caledonia"},{"id":"NZ","text":"New Zealand"},{"id":"NI","text":"Nicaragua"},{"id":"NE","text":"Niger"},{"id":"NG","text":"Nigeria"},{"id":"NU","text":"Niue"},{"id":"NF","text":"Norfolk Island"},{"id":"KP","text":"North Korea"},{"id":"MP","text":"Northern Mariana Islands"},{"id":"NO","text":"Norway"},{"id":"OM","text":"Oman"},{"id":"PK","text":"Pakistan"},{"id":"PW","text":"Palau"},{"id":"PS","text":"Palestine"},{"id":"PA","text":"Panama"},{"id":"PG","text":"Papua New Guinea"},{"id":"PY","text":"Paraguay"},{"id":"PE","text":"Peru"},{"id":"PH","text":"Philippines"},{"id":"PN","text":"Pitcairn Islands"},{"id":"PL","text":"Poland"},{"id":"PT","text":"Portugal"},{"id":"PR","text":"Puerto Rico"},{"id":"QA","text":"Qatar"},{"id":"XK","text":"Kosovo"},{"id":"RE","text":"Réunion"},{"id":"RO","text":"Romania"},{"id":"RU","text":"Russia"},{"id":"RW","text":"Rwanda"},{"id":"BL","text":"Saint Barthélemy"},{"id":"SH","text":"Saint Helena, Ascension and Tristan da Cunha"},{"id":"KN","text":"Saint Kitts and Nevis"},{"id":"LC","text":"Saint Lucia"},{"id":"MF","text":"Saint Martin"},{"id":"PM","text":"Saint Pierre and Miquelon"},{"id":"VC","text":"Saint Vincent and the Grenadines"},{"id":"WS","text":"Samoa"},{"id":"SM","text":"San Marino"},{"id":"ST","text":"São Tomé and Príncipe"},{"id":"SA","text":"Saudi Arabia"},{"id":"SN","text":"Senegal"},{"id":"RS","text":"Serbia"},{"id":"SC","text":"Seychelles"},{"id":"SL","text":"Sierra Leone"},{"id":"SG","text":"Singapore"},{"id":"SX","text":"Sint Maarten"},{"id":"SK","text":"Slovakia"},{"id":"SI","text":"Slovenia"},{"id":"SB","text":"Solomon Islands"},{"id":"SO","text":"Somalia"},{"id":"ZA","text":"South Africa"},{"id":"GS","text":"South Georgia"},{"id":"KR","text":"South Korea"},{"id":"SS","text":"South Sudan"},{"id":"ES","text":"Spain"},{"id":"LK","text":"Sri Lanka"},{"id":"SD","text":"Sudan"},{"id":"SR","text":"Suriname"},{"id":"SJ","text":"Svalbard and Jan Mayen"},{"id":"SZ","text":"Swaziland"},{"id":"SE","text":"Sweden"},{"id":"CH","text":"Switzerland"},{"id":"SY","text":"Syria"},{"id":"TW","text":"Taiwan"},{"id":"TJ","text":"Tajikistan"},{"id":"TZ","text":"Tanzania"},{"id":"TH","text":"Thailand"},{"id":"TL","text":"Timor-Leste"},{"id":"TG","text":"Togo"},{"id":"TK","text":"Tokelau"},{"id":"TO","text":"Tonga"},{"id":"TT","text":"Trinidad and Tobago"},{"id":"TN","text":"Tunisia"},{"id":"TR","text":"Turkey"},{"id":"TM","text":"Turkmenistan"},{"id":"TC","text":"Turks and Caicos Islands"},{"id":"TV","text":"Tuvalu"},{"id":"UG","text":"Uganda"},{"id":"UA","text":"Ukraine"},{"id":"AE","text":"United Arab Emirates"},{"id":"GB","text":"United Kingdom"},{"id":"US","text":"United States"},{"id":"UM","text":"United States Minor Outlying Islands"},{"id":"VI","text":"United States Virgin Islands"},{"id":"UY","text":"Uruguay"},{"id":"UZ","text":"Uzbekistan"},{"id":"VU","text":"Vanuatu"},{"id":"VE","text":"Venezuela"},{"id":"VN","text":"Vietnam"},{"id":"WF","text":"Wallis and Futuna"},{"id":"EH","text":"Western Sahara"},{"id":"YE","text":"Yemen"},{"id":"ZM","text":"Zambia"},{"id":"ZW","text":"Zimbabwe"}];
    $scope.showStep = [
      'step', true, null,null
    ];
    $scope.booking = {
      tourId: null, Date: null, Time: "10:00AM-1:00PM", transportType: 'Walking' , price: 25, Tickets: 1, TravellerId: null, totalPrice: null, from: null
    };
    //initialize booking data
    $scope.booking.tourId = $rootScope.tourId;
    if ($rootScope.from) $scope.booking.from = $rootScope.from;

    Tour.findById({id: $scope.booking.tourId}).$promise
      .then(function(res) {
        $scope.Tour = res;
        console.log('Tour founded');
      }, function(err) {
        console.log(err);
      });
    //data in step1
      //Calendar
    $scope.today = function() {
      $scope.booking.Date = new Date();
    };
    $scope.today();

    $scope.options = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }
      //TransportType
    $scope.errorTransport = true;
    $scope.transportTypes = [
      'Walking','Cyclo','Taxi'
    ];

    $scope.price = [25, 35, 45];

    $scope.checkTransport = function() {
      var length = $scope.transportTypes.length;
      for (var i=0; i<length; i++) {
        if ($scope.booking.transportType == $scope.transportTypes[i])
          $scope.booking.price = $scope.price[i];
      }
    };
      //number of Tickets
    $scope.errorTicket = true;
    $scope.numberTickets = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    $scope.checkTicket = function() {
      if ($scope.booking.Tickets == 0) {
        $scope.errorTicket = false;
      } else $scope.errorTicket = true;
    }
      //function nextToStep2
    $scope.nextToStep2 = function() {
      var flag = true;
      /*if ($scope.booking.transportType == null ) {
        flag = false;
        $scope.errorTransport = false;
      } else {$scope.errorTransport = true;}*/
      if ($scope.booking.Time == null) {
        flag = false;
        $scope.errorTime = false;
      } else $scope.errorTime = true;
      if ($scope.booking.Tickets == 0 ) {
        flag = false;
        $scope.errorTicket = false;
      } else {$scope.errorTicket = true;}
      if (flag == true) {
        console.log($scope.booking);
        console.log($scope.booking.price);
        var length = $scope.booking.Tickets;
        console.log(length);
        $scope.guests = [];
        for (var i=0; i<length; i++) {
          $scope.guests[i] = {name: '', email: ''};
          console.log($scope.guests[i]);
        }
        //initalize stipe data amount
        $scope.stripeAmount = $scope.booking.price * $scope.booking.Tickets;
        console.log('Stripe amount: ', $scope.stripeAmount);
        //hide and show divs elements:
        $scope.showStep[1] = null;
        $rootScope.step += 1;
        $scope.showStep[2] = true;
      }
    };
    $rootScope.step += 1;
    //data in step 2  //check guestInfo va expiry: chut nho chuyen lai thanh nulls
    $scope.travellerInfoObject = {
      name: null,guestInfo: null , address: null, country: null, city: null, zipCode: null, email: null, cellphone: null,
      cardholderName: null, cardNumber: null, expiry: null, cvv: null
    };

    $scope.isErrorConfirmEmail = true;
    $scope.validateCountry = true;

    $scope.travellerInfo = [
      'info', null, [], null, null, null, null, null, null, null, null, {month: 'Month..', year: 'Year..'}, null
    ];
      //put ng-hide="isError[key]' to input
    $scope.isError = [
      'Error', true, true, true, true, true, true, true, true, true, true, true, true
    ];
      //pay by credit card or not
    $scope.notCreditCard = true;
    $scope.paymentShow = [true,false,false];
    $scope.paymentType = 'paypal account';
    $scope.paymentTypes = ['paypal account', 'alipay account', 'stripe credit card'];
    /*$scope.isError = [
      'Error', false, true, false, true, false, false, false, false, false, false, true, false
    ];*/
      //function checkError and more
    $scope.checkError = function(key) {
        if ($scope.travellerInfo[key].trim() == '') {
          $scope.isError[key] = false;
        } else $scope.isError[key] = true;
    };
    $scope.checkErrorNumber = function(key) {
      if (ValidateServices.isInterger($scope.travellerInfo[key]) === false) $scope.isError[key] = false;
      else $scope.isError[key] = true;
    };
    $scope.checkEmail = function(key) {
      if (ValidateServices.isEmail($scope.travellerInfo[key]) == false) {
        $scope.isError[key] = false;
      } else $scope.isError[key] = true;
    };
    var confirmEmailFlag = false;
    $scope.checkConfirmEmail = function(key) {
      confirmEmailFlag = true;
      if (ValidateServices.isEmail($scope.confirmEmail) == false ) confirmEmailFlag = false;
      if ($scope.confirmEmail != $scope.travellerInfo[key]) confirmEmailFlag = false;
      $scope.isErrorConfirmEmail = confirmEmailFlag;
    };
    var validateCountryFlag = false;
    $scope.checkCountry = function() {
      if ($scope.travellerInfo[4] == null) {
        validateCountryFlag = false;
      } else validateCountryFlag = true;
      $scope.validateCountry = validateCountryFlag;
    };
    $scope.checkExpiryFunc = function(key, valErr) {
      console.log('Check Expiry: '+ key);
      console.log($scope.travellerInfo[11][key]);
      if ($scope.travellerInfo[11][key] == valErr) $scope.checkExpiry[key] = false;
      else $scope.checkExpiry[key] = true;
      console.log($scope.checkExpiry[key]);
    };
    $scope.checkPaymentType = function(payment) {
      var key;
      if ($scope.paymentType === payment)
        for (var i=0; i<$scope.paymentShow.length; i++) {
          $scope.paymentShow[i] = false;
          console.log('Payment flag:  ', $scope.paymentShow[i], ' ',i)
          if ($scope.paymentTypes[i] == payment) {
            key = i;
            console.log('Key :', key);
          }
        }
      $scope.paymentShow[key] = true;
    }
    //expiry data
    $scope.months = [
      'Month..',1,2,3,4,5,6,7,8,9,10,11,12
    ];
    //get years array to show in expiry year select box
    $scope.years = ['Year..' ]
    var currentYear = new Date().getFullYear();
    console.log('Nam hien tai: ',currentYear);
    for (var i=1;i<=10;i++) {
      $scope.years[i] = currentYear;
      currentYear++;
      console.log($scope.years[i]);
    }
    $scope.checkExpiry = { month: true, year: true};
    ////
    $scope.nextToStep3 = function() {
      var checkFor4;
      var flag = true;
      var length = $scope.travellerInfo.length - 4;
      console.log(length);
      //update guests to travellerInfo[2]
      $scope.travellerInfo[2] = $scope.guests;
      console.log($scope.travellerInfo[2]);
      //chua kiem soat het validate: vi du co bug co khoang trang (space)
      for (var i = 1;i < length; i++) {
        if ($scope.travellerInfo[i] == '' || $scope.isError[i] == false || $scope.travellerInfo[i] == null) {
          if (i === 4) continue;
          $scope.isError[i] = false;
          flag = false;
          console.log('vong for ',i);
        }
      }
      console.log('Trave so 4 ', $scope.travellerInfo[4], '  ',   $scope.isError[4]);
      //check error paypal credit card
      if ($scope.paymentType === 'test') {
        for (var i = length; i < $scope.travellerInfo.length; i++) {
          if ($scope.travellerInfo[i] == '' || $scope.isError[i] == false || $scope.travellerInfo[i] == null) {
            $scope.isError[i] = false;
            flag = false;
            console.log('Vong credit card : ', i);
          }
        }

         if ($scope.travellerInfo[11].month == 'Month..' || $scope.travellerInfo[11].month == null) {
        console.log('Vong month..');
        $scope.checkExpiry.month = false;
        flag = false;
      }
      if ($scope.travellerInfo[11].year == 'Year..' || $scope.travellerInfo[11].year == null) {
        console.log('Vong yearr..');
        $scope.checkExpiry.year = false;
        flag = false;
      }
      }
      if (confirmEmailFlag == false ) {
        $scope.isErrorConfirmEmail = false;
        flag = false;
        console.log('vong confirmEmail');
      }
      console.log(confirmEmailFlag);
      if (validateCountryFlag == false) {
        console.log('Vong country');
        $scope.validateCountry = false;
        flag = false;
      }
      if (flag == true) {
        var index = 0;
        for (var key in $scope.travellerInfoObject) {
        if ($scope.travellerInfoObject.hasOwnProperty(key)) {
          //console.log(key + " -> " + p[key]);
          /*if (key == 1) {
            console.log($scope.travellerInfoObject[key]);
            console.log($scope.travellerInfo[key]);
          }*/
          index += 1;
          $scope.travellerInfoObject[key] = $scope.travellerInfo[index];
          }
        }
        console.log($scope.travellerInfoObject);
        if ($scope.paymentType == 'stripe credit card') {
          $scope.notCreditCard = false;
        }
        $scope.showStep[2] = null;
        $rootScope.step += 1;
        $scope.showStep[3] = true;
      }
    };

    $scope.backToStep1 = function() {
      $scope.showStep[2] = null;
      $rootScope.step -= 1;
      $scope.showStep[1] = true;
    };

    $scope.backToStep2 = function() {
      $scope.notCreditCard = true;
      $scope.showStep[3] = null;
      $rootScope.step -= 1;
      $scope.showStep[2] = true;
    };
    $scope.finalMessage = 'Click finish to start payment.\n Thank you for using our service';
    $scope.finish = function() {
      //initialize some function
      //Save info to temp model
      function saveInfoToTemp(cb,data) {
        $scope.booking.totalPrice = $scope.booking.price * $scope.booking.Tickets;
        Temp.create({
          travellerInfo: $scope.travellerInfoObject,
          booking: $scope.booking
        }).$promise
          .then(function(res) {
            console.log('Saved info to temp: ', res);
            tempId = res.id;
            console.log('Temp ID: ',tempId);
            if (data) console.log('Data token: ',data);
            cb(data);
          }, function(err) {
            console.log(err);
            flag = false;
            checkFlag();
          });
      };

      var payByPaypal = function(emptyData) {
        var urlBase = CoreService.env.siteUrl;
        //var urlBase = "http://localhost:5000";
        var action = urlBase + '/paypal/pay';
        var data = {
          total: $scope.booking.price * $scope.booking.Tickets,
          currency:  "USD",
          description: tempId,
        };
        console.log('Data da chuan bi la: ', data);
        $http.post(action, data)
          .success(function(data,status, header, config){
            console.log('Response la:   ',data);
            $window.location.href = data;
            checkFlag();
          })
          .error(function() {
            console.log('Error');
            flag = false;
            checkFlag();
          });
      }
      var payByStripe = function(token) {
        var urlBase = CoreService.env.siteUrl;
        //var urlBase = "http://localhost:5000";
        var action = urlBase + '/stripe';
        var data = {
          total: $scope.stripeAmount, //$scope.booking.transportType.price * $scope.booking.Tickets,
          currency: "usd",
          tempId: tempId,
          stripeToken: token
        };
        console.log('Data chuan bi la: ',data);
        $http.post(action, data)
          .success(function(data, status, header, config) {
            console.log('Response la: ', data);
            $window.location.href = data;
            checkFlag();
          })
          .error(function() {
            $window.alert('Get Error. Please try again.');
            flag = false;
            checkFlag();
          });
      }
      var payByAlipay = function(emptyData) {
        var urlBase =  CoreService.env.siteUrl;
        //var urlBase = "http://localhost:5000";
        var action = urlBase + '/alipay/pay';
        var data = {
          total: 1, //$scope.booking.price * $scope.booking.Tickets,
          currency:  "USD",
          description: "Pay by alipay account: ",
          out_trade_no: tempId,
          custom: [$scope.booking, $scope.travellerInfoObject]
        };
        console.log('Data la: ', data);
        $http.post(action, data)
          .success(function(data,status, header, config) {
            console.log('Response la:   ',data);
            $window.location.href = data;
            checkFlag();
          })
          .error(function() {
            console.log('Get error.');
            flag = false;
            checkFlag();
          });
      }
      var checkFlag = function() {
        if (flag == true) $modalInstance.close();
        else $scope.finalMessage = 'Get Error \n Please try again.';
      }
      //initialize data
      var flag = true;
      var tempId = null;
      //pay by paypal account
      if ($scope.paymentType == 'paypal account') {
        saveInfoToTemp(payByPaypal);
      }
      if ($scope.paymentType == 'alipay account') {
        saveInfoToTemp(payByAlipay);
      }
      if ($scope.paymentType == 'stripe credit card') {
        $scope.stripeCheckout = function(token) {
          //alert("Got Stripe token: " + token.id);
          console.log('Got Stripe token: ', token.id);
          saveInfoToTemp(payByStripe, token.id);
        };
      }
    }

    $scope.closeModal = function() {
      $modalInstance.close();
    };
  });
