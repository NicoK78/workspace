var express = require('express');
var router = express.Router();

var _ = require('lodash');

var reviews = [
	{
		name: 'McDo',
		placeType: 'FastFood',
		stars: 3
	},
	{
		name: 'McDo1',
		placeType: 'FastFood',
		stars: 3
	},	
	{
		name: 'McDo2',
		placeType: 'FastFood2',
		stars: 1
	}
];

router.get('/', function(req, res, next) {
	res.send(reviews);
	//res.render('reviews', {title: 'Reviews', reviewsTab: reviews});
});

router.post('/', function(req, res) {
	reviews.push(
		{
			name: req.body.name, 
			placeType: req.body.placeType, 
			stars: req.body.stars
		}
	);
	res.send(reviews);
});

router.delete('/', function(req, res) {
	reviews = [];
	res.send(reviews);
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	res.send(reviews[id]);
})

router.put('/:id', function(req, res) {
	var id = req.params.id;	
	reviews[id].name = req.body.name;
	reviews[id].placeType = req.body.placeType; 
	reviews[id].stars = req.body.stars;
	res.send(reviews);
})

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	_.pullAt(reviews, id);
	res.send(reviews);
});

module.exports = router;