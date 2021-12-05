require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const morgan = require('morgan')

// rest of packages
app.use(morgan('tiny'))
// database
const connectDB = require('./db/connect')

// routers
const authRoutes = require('./routes/authRoutes')

// middleware
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
app.use(express.json())
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/api/v1/auth', authRoutes)
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
