const express = require('express')
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

// Routes
const userRoute = require('./routes/user.routes')
const taskRoute = require('./routes/task.routes')

// docs route
const docsRoute = require('./routes/api.docs.routes')
app.use(docsRoute)

app.use('/user', userRoute)
app.use('/note', taskRoute)