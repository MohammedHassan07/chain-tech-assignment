const { Schema, model } = require('mongoose')

const noteSchema = new Schema({

    user: {

        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String,
        maxlength: 30
    },

    content: {

        type: String,
        maxlength: 100
    },

    completed: {

        type: Boolean,
        default: false
    }

}, { timestamps: true })

const noteModel = model('note', noteSchema)

module.exports = noteModel