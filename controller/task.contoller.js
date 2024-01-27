const taskModel = require('../models/task.model')
const { userModel } = require('../models/user.model')
const checkLength = require('../utils/checkLength')

// add note
const addTask = async (req, res) => {

    try {

        const { title, content } = req.body
        const email = req.email

        const valid = checkLength({ title, content })

        if (!valid) {

            res.json({ flag: false, message: 'title should be less than 25 and content should be less than 100 characters' })
            return
        }

        const user = await userModel.findOne({ email })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        }

        const newNote = new taskModel({ user: user._id, title, content })
        const newData = await newNote.save()

        return res.status(201).json({ flag: true, message: 'Note added successfully', newData })

    } catch (error) {
        console.log('addNote-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}

// get completed notes
const getCompletedTasks = async (req, res) => {

    try {

        const email = req.email
        const user = await userModel.findOne({ email })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        }
        
        const notes = await taskModel.find({ user: user._id, completed: true })
        if (!notes) {

            return res.json({ flag: false, message: 'Note is not present for the user' })
        }

        return res.status(200).json({ flag: true, notes })
        
    } catch (error) {
        console.log('allNotes-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}
// update note
const updateTask = async (req, res) => {

    try {

        const email = req.email
        const { title, content, taskId } = req.body

        const user = await userModel.findOne({ email })
        const note = await taskModel.findOne({ user: user._id })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        }
        if (!note) {

            return res.json({ flag: false, message: `Note is not present for the title ${title}` })

        }

        const valid = checkLength({ title, content })
        if (!valid) {

            return res.json({ flag: false, message: 'title should be less than 25 and content should be less than 100 characters' })
        }

        const oldData = await taskModel.findOneAndUpdate({ _id: taskId }, {
            $set: { title: title, content: content }
        })

        res.status(200).json({ flag: true, message: 'Note updated successfully', oldData })

    } catch (error) {
        console.log('updateNote-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}

// task to be completed note
const completeTask = async (req, res) => {

    try {

        const email = req.email
        console.log(email)

        const user = await userModel.findOne({ email })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        }
        const taskData = await taskModel.find({ completed: false, user: user._id })

        if (!taskData) {

            return res.json({ flag: false, message: 'No task present to complete' })
        }

        res.status(200).json({ flag: true, message: 'Pending Tasks', taskData })

    } catch (error) {
        console.log('deleteNote-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}

const updateTaskStatus = async (req, res) => {

    try {

        const { taskId } = req.body
        const email = req.email
        console.log(email)

        const user = await userModel.findOne({ email })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        } else {

            const taskData = await taskModel.findOneAndUpdate({ user: user._id, _id: taksId }, { completed: true })
        }

    } catch (error) {
        console.log('deleteNote-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}

module.exports = {

    addTask,
    getCompletedTasks, completeTask,
    updateTask,
    updateTaskStatus
}