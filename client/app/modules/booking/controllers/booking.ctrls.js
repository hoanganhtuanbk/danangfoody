'use strict';
angular
  .module('com.module.booking')
  .controller('listBookingCtrl', function($scope, Booking) {
  	function getBookings() {
  		Booking.find({
      filter: {
        include: [
          'traveller',
          'tour'
        ]
      }
    }).$promise
  		  .then(function(res) {
  		  	console.log("Get bookings success.")
  		  	$scope.bookings = res;
  		  }, function(err) {
  		  	console.log(err);
  		  });
  	}
  	getBookings();

    $scope.delete = function(item) {
      console.log(item.id);
      Booking.deleteById({id: item.id}).$promise
        .then(function() {
          console.log('Deleted.');
          getBookings();
        }, function(err) {
          console.log('err');
        });
    };
  })
  .controller('editBookingCtrl', function($scope, $q, $state, $stateParams, Booking, TravellerInfo, Tour) {
    $scope.action = 'Edit';
    $scope.tours = [
    //{name: "Da Nang Tour", type: "Xich Lo", id: 1},
    //{name: "Hoi An Tour", type: "Cano", id: 2}
    ];
    $scope.selectedTour;
    $scope.booking = {};
    $scope.traveller ={};

    $q.all([
        Tour.find().$promise,
        Booking.findById( {
          id: $stateParams.id, 
          filter: {
            include: [
            'traveller'
            ]
          }
        }).$promise
      ])
      .then(function(data) {
        $scope.tours = data[0];
        $scope.booking = data[1];
        console.log($scope.booking);
        $scope.traveller = $scope.booking.traveller;
        console.log($scope.traveller);
        console.log($scope.tours[0]);
        console.log($scope.tours[1]);
        console.log('Id booking:', $scope.booking.tourId);
        $scope.selectedTour = $scope.tours[$scope.booking.tourId-1];//id starts from 1 but array starts from 0
        console.log('Selected Tour:',$scope.selectedTour);
    });

      $scope.submitForm = function() {
        $scope.booking.tourId = $scope.selectedTour.id;
        console.log($scope.booking);
        $q.all([
          TravellerInfo.upsert($scope.traveller).$promise,
           Booking.upsert($scope.booking).$promise
          ])
          .then(function() {
            console.log('Edit sucess');
          }, function(err) {
            console.log(err);
          } )
          .finally( function() {
            $state.go('app.booking');
          });
      };
    });