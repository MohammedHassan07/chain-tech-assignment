const express = require('express')

const route = express.Router()

route.get('/', (req, res) => {

    res.render('home')
})

route.get('/user-login', (req, res) => {
    res.render('user-login')
})


module.exports = route