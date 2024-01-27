const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const { addTask, getCompletedTasks, completeTask, updateTask, updateTaskStatus} = require('../controller/task.contoller')

const route = express.Router()

route.use(verifyToken)

route.post('/add-task', addTask)

route.post('/get-completed-task', getCompletedTasks)

route.post('/update-task', updateTask)

// task to be completed 
route.get('/complete-task', completeTask)

route.post('/update-task-status', updateTaskStatus)


module.exports = route