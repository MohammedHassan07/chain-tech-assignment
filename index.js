const express = require('express')
const hbs = require('hbs')
const cors = require('cors')
const { connectToDatabase } = require('./utils/connectToDB')
const dotenve = require('dotenv')
dotenve.config()

const app = express()

const PORT = process.env.PORT || 9999
app.listen(PORT, () => {

    console.log(`Server is up at ${PORT}`)

    // connect to DB
    connectToDatabase()
})

app.use(express.json())
app.use(express.static('./public'))
app.set('view engine', 'html')
app.engine('html', hbs.__express)
app.use(cors({option: '*'}))

// Routes
const homeRoute = require('./routes/home.routes')
const userRoute = require('./routes/user.routes')
const taskRoute = require('./routes/task.routes')

// docs route
const docsRoute = require('./routes/api.docs.routes')
app.use(docsRoute)

app.use('/home', homeRoute)
app.use('/user', userRoute)
app.use('/task', taskRoute)