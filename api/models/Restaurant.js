const mongoose = require('mongoose')

//creating the schema for a restaurant
const RestaurantSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  neighborhood: {
    type: String,
    require: true
  },
  gps: {
    lat: {
      type: String,
      require: true
    },
    lng: {
      type: String,
      require: true
    }
  },
  address: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  img: {
    type: String,
    require: true
  },
  menu: [
    {
      name: String,
      price: String,
      description: String,
      tags: [String],
      tod: [String]
    }
  ]
})

//assigning the schema to the mongoose model
const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = Restaurant
