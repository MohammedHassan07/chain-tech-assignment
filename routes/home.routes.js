const express = require('express')

const route = express.Router()

route.get('/', (req, res) => {

    res.render('home')
})

route.get('/user-login', (req, res) => {
    res.render('user-login')
})

route.get('/user-register', (req, res) => {
    res.render('user-register')
})


module.exports = route