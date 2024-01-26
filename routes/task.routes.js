const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const { addTask, getCompletedTasks, completeTask, updateTask} = require('../controller/task.contoller')

const route = express.Router()

route.use(verifyToken)

route.post('/add-task', addTask)

// route.post('/get-single-note', getSingleNote)

route.post('/get-completed-task', getCompletedTasks)

route.post('/update-task', updateTask)

route.post('/complete-task', completeTask)


module.exports = route