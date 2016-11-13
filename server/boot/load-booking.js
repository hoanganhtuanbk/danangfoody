'use strict';
module.exports = function(app) {
	var tour = app.models.Tour;
	var travellerInfo = app.models.TravellerInfo;
	var booking = app.models.Booking;
	var travellers =[0];
	var tours =[0];
	var date = new Date();
	travellerInfo.create([
        {firstname: 'demo', lastname: 'demo', address: 'demo add',country: 'vietnam', city: 'danang',
        zipcode: 123, email: 'demo@demo.com', cellphone: 01693754964, cardholderName: 'hieuvecto',
    	cardNumber: 12345, expiry: date, cvv: 1234}

		], function(err, res) {
			if (err) console.log(err);
			travellers = res;
			console.log('Created traveller:', travellers);
			console.log('Here is Id:', travellers[0].id)
		});
	tour.create([
		{name: 'Da Nang Food Tour', type: 'Cyclo', description: 'This is a description of Da Nang Food Tour'}
		
		], function(err, res) {
			if (err) console.log(err);
			tours = res;
			console.log('Created tours:',tours);
			console.log('Here is id:', tours[0].id);
			createBookings();
		});

	function createBookings() {
	booking.create([
		{ tourId: tours[0].id, Date: date, transportType: { type: 'Walking', price: 25}, travellerId: travellers[0].id }
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