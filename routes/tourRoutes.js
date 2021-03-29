const express = require('express');
const tourController=require('../controllers/tourController');
const Router = express.Router();

// Router.param('id',tourController.checkID); 
// Router.param('body',tourController.checkBody);

//Create checkBody middleware 

//Check if the body contains the name and price property

//If not, send back 404 (bad request)

// Add it to the post handler stack 



Router
.route('/')
.get(tourController.getTours)
.post(tourController.addTour);


Router
.route('/tour-stats')
.get(tourController.getTourStats);

Router
.route('/monthly-plan/:year')
.get(tourController.getMonthlyPlan);

Router
.route('/top-5-cheap-tours')
.get(tourController.aliasTopTours,tourController.getTours);


Router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.changeTour)
.delete(tourController.deleteTour);


module.exports = Router;