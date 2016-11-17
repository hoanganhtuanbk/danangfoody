(function () {
  'use strict';
  angular
    .module('com.module.about')
    .run(function ($rootScope, gettextCatalog, About) {
       $rootScope.addMenu(gettextCatalog.getString('About'), 'app.about.index', 'fa-calendar-o');
        About.find(function (data) {
            $rootScope.addDashboardBox('About', 'bg-orange', 'fa-calendar-o', data.length, 'app.about.index');
        });
    });
})();
