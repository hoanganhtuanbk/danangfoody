'use strict';
angular
  .module('com.module.index')
  .controller('modal3Step', function ($scope, $modal, $modalInstance, CoreService, $rootScope, $http, $window, Tour, Temp, TravellerInfo, Booking, ValidateServices, CountryData, $filter) {
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
    $scope.countries = CountryData.countryData();
    $scope.showStep = [
      'step', true, null, null
    ];
    $scope.booking = {
      tourId: null,
      Date: null,
      Time: "10:00AM-1:00PM",
      transportType: 'Walking',
      price: 25,
      Tickets: 1,
      TravellerId: null,
      totalPrice: null,
      from: null
    };
    //initialize booking data
    $scope.booking.tourId = $rootScope.tourId;
    if ($rootScope.from) $scope.booking.from = $rootScope.from;

    Tour.findById({id: $scope.booking.tourId}).$promise
      .then(function (res) {
        $scope.Tour = res;
        console.log('Tour founded');
      }, function (err) {
        console.log(err);
      });
    //data in step1
    //Calendar
    $scope.today = function () {
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
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

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
      'Walking', 'Cyclo', 'Taxi'
    ];

    $scope.price = [25, 35, 45];

    $scope.checkTransport = function () {
      var length = $scope.transportTypes.length;
      for (var i = 0; i < length; i++) {
        if ($scope.booking.transportType == $scope.transportTypes[i])
          $scope.booking.price = $scope.price[i];
      }
    };
    //number of Tickets
    $scope.errorTicket = true;
    $scope.numberTickets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    $scope.checkTicket = function () {
      if ($scope.booking.Tickets == 0) {
        $scope.errorTicket = false;
      } else $scope.errorTicket = true;
    }
    //function nextToStep2
    $scope.nextToStep2 = function () {
      var flag = true;
      /*if ($scope.booking.transportType == null ) {
       flag = false;
       $scope.errorTransport = false;
       } else {$scope.errorTransport = true;}*/
      if ($scope.booking.Time == null) {
        flag = false;
        $scope.errorTime = false;
      } else $scope.errorTime = true;
      if ($scope.booking.Tickets == 0) {
        flag = false;
        $scope.errorTicket = false;
      } else {
        $scope.errorTicket = true;
      }
      if (flag == true) {
        console.log($scope.booking);
        console.log($scope.booking.price);
        var length = $scope.booking.Tickets;
        console.log(length);
        $scope.guests = [];
        for (var i = 0; i < length; i++) {
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
      name: null,
      guestInfo: null,
      address: null,
      country: null,
      city: null,
      zipCode: null,
      email: null,
      cellphone: null,
      cardholderName: null,
      cardNumber: null,
      expiry: null,
      cvv: null
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
    $scope.paymentShow = [true, false, false];
    $scope.paymentType = 'paypal account';
    $scope.paymentTypes = ['paypal account', 'alipay account', 'stripe credit card'];
    /*$scope.isError = [
     'Error', false, true, false, true, false, false, false, false, false, false, true, false
     ];*/
    //function checkError and more
    $scope.checkError = function (key) {
      if ($scope.travellerInfo[key].trim() == '') {
        $scope.isError[key] = false;
      } else $scope.isError[key] = true;
    };
    $scope.checkErrorNumber = function (key) {
      if (ValidateServices.isInterger($scope.travellerInfo[key]) === false) $scope.isError[key] = false;
      else $scope.isError[key] = true;
    };
    $scope.checkEmail = function (key) {
      if (ValidateServices.isEmail($scope.travellerInfo[key]) == false) {
        $scope.isError[key] = false;
      } else $scope.isError[key] = true;
    };
    var confirmEmailFlag = false;
    $scope.checkConfirmEmail = function (key) {
      confirmEmailFlag = true;
      if (ValidateServices.isEmail($scope.confirmEmail) == false) confirmEmailFlag = false;
      if ($scope.confirmEmail != $scope.travellerInfo[key]) confirmEmailFlag = false;
      $scope.isErrorConfirmEmail = confirmEmailFlag;
    };
    var validateCountryFlag = false;
    $scope.checkCountry = function () {
      if ($scope.travellerInfo[4] == null) {
        validateCountryFlag = false;
      } else validateCountryFlag = true;
      $scope.validateCountry = validateCountryFlag;
    };
    $scope.checkExpiryFunc = function (key, valErr) {
      console.log('Check Expiry: ' + key);
      console.log($scope.travellerInfo[11][key]);
      if ($scope.travellerInfo[11][key] == valErr) $scope.checkExpiry[key] = false;
      else $scope.checkExpiry[key] = true;
      console.log($scope.checkExpiry[key]);
    };
    $scope.checkPaymentType = function (payment) {
      var key;
      if ($scope.paymentType === payment)
        for (var i = 0; i < $scope.paymentShow.length; i++) {
          $scope.paymentShow[i] = false;
          console.log('Payment flag:  ', $scope.paymentShow[i], ' ', i);
          if ($scope.paymentTypes[i] == payment) {
            key = i;
            console.log('Key :', key);
          }
        }
      $scope.paymentShow[key] = true;
    };
    //expiry data
    $scope.months = [
      'Month..', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];
    //get years array to show in expiry year select box
    $scope.years = ['Year..']
    var currentYear = new Date().getFullYear();
    console.log('Nam hien tai: ', currentYear);
    for (var i = 1; i <= 10; i++) {
      $scope.years[i] = currentYear;
      currentYear++;
      console.log($scope.years[i]);
    }
    $scope.checkExpiry = {month: true, year: true};
    ////
    $scope.nextToStep3 = function () {
      var checkFor4;
      var flag = true;
      var length = $scope.travellerInfo.length - 4;
      console.log(length);
      //update guests to travellerInfo[2]
      $scope.travellerInfo[2] = $scope.guests;
      console.log($scope.travellerInfo[2]);
      for (var i = 1; i < length; i++) {
        if ($scope.travellerInfo[i] == '' || $scope.isError[i] == false || $scope.travellerInfo[i] == null) {
          if (i === 4) continue;
          $scope.isError[i] = false;
          flag = false;
          console.log('vong for ', i);
        }
      }
      console.log('Trave so 4 ', $scope.travellerInfo[4], '  ', $scope.isError[4]);
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
      if (confirmEmailFlag == false) {
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

    $scope.backToStep1 = function () {
      $scope.showStep[2] = null;
      $rootScope.step -= 1;
      $scope.showStep[1] = true;
    };

    $scope.backToStep2 = function () {
      $scope.notCreditCard = true;
      $scope.showStep[3] = null;
      $rootScope.step -= 1;
      $scope.showStep[2] = true;
    };
    $scope.finalMessage = $translate('MODAL.FINALMEG');
    $scope.finish = function () {
      //initialize some function
      //Save info to temp model
      function saveInfoToTemp(cb, data) {
        $scope.booking.totalPrice = $scope.booking.price * $scope.booking.Tickets;
        Temp.create({
          travellerInfo: $scope.travellerInfoObject,
          booking: $scope.booking
        }).$promise
          .then(function (res) {
            console.log('Saved info to temp: ', res);
            tempId = res.id;
            console.log('Temp ID: ', tempId);
            if (data) console.log('Data token: ', data);
            cb(data);
          }, function (err) {
            console.log(err);
            flag = false;
            checkFlag();
          });
      }

      var payByPaypal = function (emptyData) {
        var urlBase = CoreService.env.siteUrl;
        //var urlBase = "http://localhost:5000";
        var action = urlBase + '/paypal/pay';
        var data = {
          total: $scope.booking.price * $scope.booking.Tickets,
          currency: "USD",
          description: tempId,
        };
        console.log('Data da chuan bi la: ', data);
        $http.post(action, data)
          .success(function (data, status, header, config) {
            console.log('Response la:   ', data);
            $window.location.href = data;
            checkFlag();
          })
          .error(function () {
            console.log('Error');
            flag = false;
            checkFlag();
          });
      };
      var payByStripe = function (token) {
        var urlBase = CoreService.env.siteUrl;
        //var urlBase = "http://localhost:5000";
        var action = urlBase + '/stripe';
        var data = {
          total: $scope.stripeAmount, //$scope.booking.transportType.price * $scope.booking.Tickets,
          currency: "usd",
          tempId: tempId,
          stripeToken: token
        };
        console.log('Data chuan bi la: ', data);
        $http.post(action, data)
          .success(function (data, status, header, config) {
            console.log('Response la: ', data);
            $window.location.href = data;
            checkFlag();
          })
          .error(function () {
            $window.alert('Get Error. Please try again.');
            flag = false;
            checkFlag();
          });
      }
      var payByAlipay = function (emptyData) {
        var urlBase = CoreService.env.siteUrl;
        //var urlBase = "http://localhost:5000";
        var action = urlBase + '/alipay/pay';
        var data = {
          total: $scope.booking.price * $scope.booking.Tickets,
          currency: "USD",
          description: "Pay by alipay account: ",
          out_trade_no: tempId,
          custom: [$scope.booking, $scope.travellerInfoObject]
        };
        console.log('Data la: ', data);
        $http.post(action, data)
          .success(function (data, status, header, config) {
            console.log('Response la:   ', data);
            $window.location.href = data;
            checkFlag();
          })
          .error(function () {
            console.log('Get error.');
            flag = false;
            checkFlag();
          });
      };
      var checkFlag = function () {
        if (flag == true) $modalInstance.close();
        else $scope.finalMessage = 'Get Error \n Please try again.';
      };
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
        $scope.stripeCheckout = function (token) {
          //alert("Got Stripe token: " + token.id);
          console.log('Got Stripe token: ', token.id);
          saveInfoToTemp(payByStripe, token.id);
        };
      }
    };

    $scope.closeModal = function () {
      $modalInstance.close();
    };
  });
