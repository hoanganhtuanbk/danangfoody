'use strict';
module.exports = function(app) {
	var tour = app.models.Tour;
	function createDanangFoodTour () {
		tour.create([
			{name: 'Foody Story Tour', description: 'This is a description of Da Nang Food Tour'}
		
			], function(err, res) {
				if (err) console.log(err);
				console.log('Created Da Nang Food tour:',res);
				console.log('Here is id:', res[0].id);
			});
	}
	tour.find()
	  .then(function(res) {
	  	if (res.length != 0) {
	  		console.log('Response of find tour: ',res);
	  		console.log('Da nang Food Tour Info is exist.');
	  	} 
	  	else createDanangFoodTour();
	  });
};