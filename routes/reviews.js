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
	if(!reviews[0]) {
		res.status(404).send();
	} else {
		res.status(200).send(reviews);
		//res.render('reviews', {title: 'Reviews', reviewsTab: reviews});
	}
});

router.post('/', function(req, res) {
	if(req.body.name && req.body.placeType && req.body.stars) {
		reviews.push({
			name: req.body.name, 
			placeType: req.body.placeType, 
			stars: req.body.stars
		});
		res.status(201).send(reviews);
	} else {
		res.status(400).send("Worst Request Ever !");
	}
});

router.delete('/', function(req, res) {
	if(!reviews[0]) {
		res.status(404).send("Empty Array !");
	} else {
		reviews = [];
		res.status(202).send(reviews);
	}
});

router.get('/:id', function(req, res, next) {
	if(!reviews[id]) {
		res.status(404).send();
	} else {
		var id = req.params.id;
		res.status(200).send(reviews[id]);
	}
});

router.put('/:id', function(req, res) {
	if(req.body.name && req.body.placeType && req.body.stars) {
		var id = req.params.id;	
		reviews[id].name = req.body.name;
		reviews[id].placeType = req.body.placeType; 
		reviews[id].stars = req.body.stars;
		res.status(200).send(reviews);
	} else {
		res.status(400).send("Worst Request Ever !");
	}
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	console.log(reviews[id]);
	if(!reviews[id]) {
		res.status(404).send();
	} else {
		_.pullAt(reviews, id);
		res.status(202).send(reviews);
	}
});

module.exports = router;