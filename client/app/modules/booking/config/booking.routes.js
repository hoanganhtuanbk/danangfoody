'use strict';
angular
  .module('com.module.booking')
  .config(function($stateProvider) {
    $stateProvider
      .state('app.booking', {
      	url: '/booking',
      	templateUrl: 'modules/booking/views/booking.html',
      	controller: 'listBookingCtrl'
      })
      .state('app.editBooking', {
      	url: '/booking/edit/:id',
      	templateUrl: 'modules/booking/views/edit-form.html',
      	controller: 'editBookingCtrl'
      })
      .state('app.viewBooking', {
        url: '/booking/view/:id',
        templateUrl: 'modules/booking/views/viewBooking.html',
        controller: 'viewBookingCtrl'
      });
  });