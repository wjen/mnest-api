require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// rest of packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
// database
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
// middleware
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req, res) => {
  res.send('mnest-api')
})

app.get('/api/v1', (req, res) => {
  // console.log(req.cookies)
  // use sign cookies when signed option on cookies is true
  console.log(req.signedCookies)
  res.send('mnest-api')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

// connectDB

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
