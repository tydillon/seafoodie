//Before starting this file, I initiated "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" on the terminal
// I also npm installed body-parser, mongoose, express. Also nodemon as dev dep
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const morgan = require('morgan')
const passport = require('./passport')
const MongoStore = require('connect-mongo')(session)
mongoose.Promise = global.Promise

const RestaurantRoutes = require('./routes/restaurants')
const UserRoutes = require('./routes/users')

// connects to the database
mongoose.connect('mongodb://localhost:27017/restaurants', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const app = express()
app.use(cors())
app.use(morgan('dev'))

//Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

//sessions
app.use(
  session({
    secret: 'chs-sea-foodie',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  })
)
app.use((req, res, next) => {
  console.log('req.session', req.session)
  next()
})

// passport
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/restaurants', RestaurantRoutes)
app.use('/users', UserRoutes)

//main get route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: `You've initiated the server!` })
})

//turns on the api server. npm run start and then navigate to localhost:8005 and the server should be working
app.listen(8005, () => {
  console.log('Server is up and running on PORT 8005')
})
