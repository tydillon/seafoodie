const express = require('express')
const Restaurant = require('../models/Restaurant')
const router = express.Router()

// /restaurants route
router
  .route('/')
  // to get all restaurants
  .get((req, res) => {
    Restaurant.find({}).then(restaurants => {
      res.json({ status: 'ok', data: restaurants })
    })
  })
  // to add a new restaurant
  .post((req, res) => {
    const rawRestaurant = req.body
    const newRestaurant = new Restaurant(rawRestaurant)
    newRestaurant.save()
    res.json({ status: 'ok', newRestaurant })
  })

router
  .route('/:restaurantId')
  // return an individual restaurant
  .get((req, res) => {
    Restaurant.findById(req.params.restaurantId).then(restaurant => {
      res.json({ restaurant })
    })
  })
  // edit a restaurant
  // .put((req, res) => {
  //   Restaurant.findById(req.params.restaurantId).then(restaurant => {
  //     restaurant.name = req.body.name
  //     restaurant.neighborhood = req.body.neighborhood
  //     restaurant.address = req.body.address
  //     restaurant.gps.lat = req.body.gps.lat
  //     restaurant.gps.long = req.body.gps.long
  //     restaurant.phone = req.body.phone
  //     restaurant.url = req.body.url
  //     restaurant.menu = req.body.menu
  //     restaurant.img = req.body.img
  //     restaurant.save()
  //     res.json(restaurant)
  //   })
  // })
  .put((req, res) => {
    Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      { $set: req.body },
      function(err, result) {
        if (err) {
          console.log(err)
        }
        console.log('RESULT: ' + result)
        res.send('Done')
      }
    )
  })
  // delete a restaurant
  .delete((req, response) => {
    Restaurant.findByIdAndDelete(req.params.restaurantId).then(res => {
      response.json({ status: 'ok', res: res })
    })
  })

module.exports = router
