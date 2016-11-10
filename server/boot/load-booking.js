'use strict';
module.exports = function(app) {
	var tour = app.models.Tour;
	var travellerInfo = app.models.TravellerInfo;
	var booking = app.models.Booking;
	var travellers =[0];
	var tours =[0];
	var date = new Date();
	travellerInfo.create([
        {firstname: 'Hieu', lastname: 'Truong Phuoc', email: 'hieuvecto@gmail.com'},
        {firstname: 'Thien', lastname: 'Nguyen Phuoc Nguong', email: 'thien@gmail.com'},

		], function(err, res) {
			if (err) console.log(err);
			travellers = res;
			console.log('Created traveller:', travellers);
			console.log('Here is Id:', travellers[0].id)
		});
	tour.create([
		{name: 'Da Nang Tour', type: 'Xich Lo'},
		{name: 'Hoi An Tour', type: 'Cano'},
		], function(err, res) {
			if (err) console.log(err);
			tours = res;
			console.log('Created tours:',tours);
			console.log('Here is id:', tours[0].id);
			createBookings();
		});

	function createBookings() {
	booking.create([
		{ tourId: tours[0].id, Date: date, travellerId: travellers[0].id },
		{ tourId: tours[1].id, Date: date, travellerId: travellers[1].id}
		],function(err, res) {
			if (err) console.log(err);
			console.log('Created Booking:', res);
		});
	}
	/*booking.create([
		{ tourId: 1, Date: date, travellerId: 1 },
		{ tourId: 2, Date: date, travellerId: 2}
		],function(err, res) {
			if (err) console.log(err);
			console.log('Created Booking:', res);
		});*/

};