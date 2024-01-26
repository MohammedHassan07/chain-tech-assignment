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
// get single note
const getSingleNote = async (req, res) => {

    try {

        const email = req.email
        const noteId = req.query.id

        const user = await userModel.findOne({ email })
        const note = await taskModel.findOne({ _id: noteId, user: user._id })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        }

        if (!note) {

            return res.json({ flag: false, message: `Note is not present with the ID ${noteId}` })

        }

        return res.json({ flag: true, message: 'Note is present', note })

    } catch (error) {
        console.log('oneNote-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}
// get all notes
const getCompletedTasks = async (req, res) => {

    try {

        const email = req.email
        const user = await userModel.findOne({ email })
        const notes = await taskModel.find({ user: user._id })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        }
        if (!notes) {

            return res.json({ flag: false, message: 'Note is not present for the user' })

        }

        return res.status(200).json({ flag: true, message: 'All notes', notes })


    } catch (error) {
        console.log('allNotes-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}
// update note
const updateTask = async (req, res) => {

    try {

        const email = req.email
        const { title, newContent } = req.body

        const user = await userModel.findOne({ email })
        const note = await taskModel.findOne({ title, user: user._id })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        }
        if (!note) {

            return res.json({ flag: false, message: `Note is not present for the title ${title}` })

        }

        const valid = checkLength({ title, newContent })
        if (!valid) {

            return res.json({ flag: false, message: 'title should be less than 25 and content should be less than 100 characters' })
           
        }

        const oldData = await taskModel.findOneAndUpdate({ title }, { $set: { content: newContent } })

        res.status(200).json({ flag: true, message: 'Note updated successfully', oldData })

    } catch (error) {
        console.log('updateNote-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}
// delete note
const completeTask = async (req, res) => {

    try {

        const email = req.email
        const noteId = req.query.id

        const user = await userModel.findOne({ email })

        if (!user) {

            return res.status(401).json({ flag: false, message: 'user not present try to log in again' })
        }
        const noteData = await taskModel.findOne({ _id: noteId, user: user._id })

        if (!noteData) {

            return res.json({ flag: false, message: `Note is not exist with ID ${noteId} ` })
        }

        const deletedData = await taskModel.findOneAndDelete({ _id: noteId })
        res.status(200).json({ flag: true, message: 'Note deleted successfully', deletedData })

    } catch (error) {
        console.log('deleteNote-->', error)
        res.json({ flag: false, message: 'Internal Server Error' })
    }
}

module.exports = {

    addTask, getSingleNote,
    getCompletedTasks, completeTask,
    updateTask
}