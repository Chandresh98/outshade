const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
    title:{
        type: String,
        enum:['Mr','Mrs','Miss'],
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
    },
    forgotToken:{
        type: String,
        default:null
    }
}, { timestamps: true })

module.exports = mongoose.model('userCollection', userModel)