const express = require('express')
const User = require('../models/User')
const router = express.Router()
const passport = require('../passport')

// caching disabled for every route
// prevents user from being able to see protected routes using browser's 'back' button
// may not always work, depending on browser configuration
// must place this block of code before defining routes
router.use((req, res, next) => {
  res.set(
    'Cache-Control',
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  )
  next()
})

// /users route
router
  .route('/')
  // to get all users
  .get((req, res) => {
    User.find({}).then(users => {
      res.json({ status: 'ok', data: users })
    })
  })
  // to register new user
  .post((req, res, next) => {
    console.log(`user signup`)
    req.session.username = req.body.username

    const { username, password } = req.body

    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log('User.js post error: ', err)
      } else if (user) {
        res.json({
          error: `Sorry, already a user with that username: ${username}`
        })
      } else {
        const newUser = new User({ username, password })
        newUser.save((err, savedUser) => {
          if (err) return res.json(err)
          res.json(savedUser)
        })
      }
    })
  })

//to login /users/login
router
  .route('/login')
  .post(
    function(req, res, next) {
      console.log('routes/Users.js, login, req.body: ')
      console.log(req.body)
      next()
    },
    passport.authenticate('local'),
    (req, res) => {
      console.log('logged in', req.user)
      var userInfo = {
        username: req.user.username
      }
      res.send(userInfo)
    }
  )
  .get((req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
      res.json({ user: req.user })
    } else {
      res.json({ user: null })
    }
  })

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ msg: 'logging out' })
  } else {
    res.send({ msg: 'no user to log out' })
  }
})

router
  .route('/:userId')
  // return an individual user
  .get((req, res) => {
    User.findById(req.params.userId).then(user => {
      res.json({ user })
    })
  })

  .put((req, res) => {
    User.findByIdAndUpdate(req.params.userId, { $set: req.body }, function(
      err,
      result
    ) {
      if (err) {
        console.log(err)
      }
      console.log('RESULT: ' + result)
      res.send('Done')
    })
  })
  // delete a user
  .delete((req, response) => {
    User.findByIdAndDelete(req.params.userId).then(res => {
      response.json({ status: 'ok', res: res })
    })
  })

module.exports = router
