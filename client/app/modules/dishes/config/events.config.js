(function () {
  'use strict';
  angular
    .module('com.module.dishes')
    .run(function ($rootScope, Event, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Dishes'), 'app.dishes.list', 'fa fa-spoon');

      Event.find(function (data) {
        $rootScope.addDashboardBox('Dishes', 'bg-purple', 'fa fa-spoon', data.length, 'app.dishes.list');
      });



    });

})();
