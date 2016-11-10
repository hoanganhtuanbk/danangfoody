(function () {
  'use strict';
  angular
    .module('com.module.booking')
    .run(function ($rootScope, Booking, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Booking'), 'app.booking', 'fa-calendar-o');

      Booking.find(function (data) {
        $rootScope.addDashboardBox('Booking', 'bg-purple', 'ion-calendar', data.length, 'app.booking');
      });

    });

})();