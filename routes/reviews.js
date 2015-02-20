var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Reviews = require('../database/Reviews');

var _ = require('lodash');


// Top 3
router.route('/topPlace')
	.get(function (req, res) {
		var options = {
			"limit": 3,
			"sort": "-stars"
		};
		Reviews.find({}, null, options, function(err, reviews) {
			if (err) {
				res.status(500).send({'error': err});
			} else {
				//res.status(200).send(reviews);				
				res.status(200);
				var accept = req.get('Accept');
				if(accept.indexOf("html")){
					res.render('topReviews', { title: 'Reviews', elements: reviews });
				} else {
					res.send(reviews);
				}
			}
		});
	});

// Actions on all reviews
router.route('/')
	.get(function (req, res) {
		var options = {
			"sort": "name"
		}
		Reviews.find({}, null, options, function (err, reviews) {
			if (err) {
				res.status(500).send({'error': err});
			} else {
				//res.status(200).send(reviews);				
				res.status(200);
				var accept = req.get('Accept');
				if(accept.indexOf("html")){
					res.render('reviews', { title: 'Reviews', elements: reviews });
				} else {
					res.send(reviews);
				}
			}
		});
	})
	.post(function (req, res) {
		console.log("Test");
		if(req.body.name && req.body.placeType && req.body.stars) {
			Reviews.create(req.body, function (err, review) {
				if (err) {
					res.status(500).send({'error': err});
				}
				//res.status(201).send(review);
				res.status(201);
				var accept = req.get('Accept');
				if(accept.indexOf("html")){
					res.render('oneReview', { title: 'Review', element: review });
				} else {
					res.send(review);
				}
			});
		}
		else {
			res.status(400).send("Worst Request Ever !");
		}
	})
	.delete(function (req, res) {
		Reviews.remove({}, function (err) {
			res.status(200).send();
		});
	});



// Actions with 'id'
router.route('/:id')
	.get(function (req, res) {
		Reviews.findOne({_id: req.params.id}, function (err, review) {
			if (err) {
				res.status(500).send({'error': err});
			} else {
				if (!review) {
					res.status(404).send("Review not find");
				} else {
					res.status(200);
					var accept = req.get('Accept');
					if(accept.indexOf("html")) {
						res.render('oneReview', {title: 'Reviews', element: review})
					} else {
						res.send(review);
					}
				}
			}
		});
	})
	.put(function(req, res) {
		if(req.body.name && req.body.placeType && req.body.stars) {
			Reviews.findByIdAndUpdate(req.params.id, req.body, function (err, review) {
				if (err) {
					res.status(500).send({'error': err});
				} else {
					res.status(200).send(review);
				}
			});
		} else {
			res.status(400).send("Worst Request Ever !");
		}
	}) 
	.delete(function (req, res) {
		Reviews.remove({_id: req.params.id}, function (err) {
			if(err) {
				res.status(400).send();
			}
			res.status(200).send();
		});
	});

module.exports = router;