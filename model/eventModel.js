const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const eventModel = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    eventDate: {
        type: String,
    },
    createdBy: {
        type:ObjectId,
        ref:"userCollection",
    },
    invitees:[{
        invitee: {
            type:String
        },
        invitedAt:{
            type:String
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model('eventCollection', eventModel)