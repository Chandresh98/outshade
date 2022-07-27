const { decode } = require('jsonwebtoken')
const validator = require('../middleware/validator')
const eventModel = require('../model/eventModel')
const userModel = require('../model/userModel')
const moment = require('moment')




const createEvent = async function (req, res) {
    try {
        let data = req.body
        let userId = req.params.userId
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like tile etc" })
        }
        const { title, description } = data

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Enter valid UserId" })
        }

        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, massage: "please enter title" })
        }

        if (!validator.isValid(description)) {
            return res.status(400).send({ status: false, massage: "please enter description" })
        }
        if (req.decodedToken.UserId == userId) {
            let testDate = new Date()
            data.eventDate = moment(testDate,'mm/dd/yyyy');
           

            const user = await userModel.findOne({ _id: req.decodedToken.UserId })
            if (!user) {
                return res.status(403).send({ status: false, message: 'you are not authorized' })
            }
            data.createdBy = req.decodedToken.UserId

            let eventCreate = await eventModel.create(data)
            return res.status(201).send({ status: true, message: "successful", data: eventCreate })


        } else {
            return res.status(403).send({ status: false, message: "authorization denied" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const inviteUser = async function(req,res){
    try{
        const data = req.body 
        let userId = req.params.userId
        let inviteId = req.params.eventId
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like email-Id." })
        }
        const { invitee } = data
         let filter = {}
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Enter valid UserId" })
        }
        if (!validator.isValidObjectId(inviteId)) {
            return res.status(400).send({ status: false, message: "Enter valid inviteId" })
        }

        if (!validator.isValid(invitee)) {
            return res.status(400).send({ status: false, massage: "please enter invitee email-id" })
        }
        let inviteDetails = await eventModel.findById(inviteId)
        if(!inviteDetails){
            return res.status(400).send({ status: false, massage: "event is not found first create an event" })
        }
        if (!validator.isValidEmail(invitee)) {
            return res.status(400).send({ status: false, massage: "please enter correct email like:- abc@gmail.com" })
        }
        
        let user = await userModel.findOne({email:invitee})
        if(!user){
            return res.status(400).send({ status: false, massage: "user is not register" })
        }
         
        let invitees = inviteDetails.invitees

        for(let i=0;i<invitees.length;i++){
            let u_id=invitees[i].invitee
            if(u_id == user._id){
                return res.status(400).send({ status: false, massage: "user already invited" })
            }
        }

         filter['invitee'] = user._id
         filter['invitedAt']=new Date()
        if(req.decodedToken.UserId == userId){

            let updateInvite = await eventModel.findOneAndUpdate({_id:inviteId},{$push:{invitees:filter}})
            console.log(updateInvite)

            return res.status(200).send({status:true,Message:"successful invited",Data:filter})
        }else{
            return res.status(403).send({ status: false, message: "authorization denied" })
        }


    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const listEventbyFilter = async function(req,res){
    try{
        const date = req.query.date
        const title=req.query.title
        const discription = req.query.description



        let filter = {}

        if(validator.isValid(date)){
           if((moment(`${date}`,'MM/DD/YYYY',true).isValid())!=  true){
            return res.status(400).send({ status: false, message: "please enter date in MM/DD/YYYY" })
           }
           filter['eventDate']=date
        }

        if(validator.isValid(title)){
            filter['title'] = { $regex: '^' + `${title}`, $options: 'i' }
        }

        if(validator.isValid(discription)){
            filter['description'] = { $regex: '^' + `${discription}`, $options: 'i' }
        }

        if (Object.keys(filter).length === 0) {
            let findevent = await eventModel.find().sort().limit(3)
            return res.status(200).send({status:true,message:"successful",Data:findevent})
        }
        let findevent = await eventModel.find(filter).sort().limit(3)
        return res.status(200).send({status:true,message:"successful",Data:findevent})

    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const upadateEvent = async function(req,res){
    try{
        const data = req.body 
        let userId = req.params.userId
        let eventId = req.params.eventId

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data title or discription." })
        }
        
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Enter valid UserId" })
        }
        if (!validator.isValidObjectId(eventId)) {
            return res.status(400).send({ status: false, message: "Enter valid eventId" })
        }

        let filter = {}

        const { title,description } = data
         if(validator.isValid(title)){
             filter['title'] = title
         }

         if(validator.isValid(description)){
            filter['description'] = description
         }
         if (Object.keys(filter).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data tile or Discription etc" })
        }

         
        if(req.decodedToken.UserId == userId){

           let eventDetais = await eventModel.findOneAndUpdate({_id:eventId},{$set:filter})
           return res.status(200).send({status:true,message:"update successful",Data:eventDetais})
        }else{
            return res.status(403).send({ status: false, message: "authorization denied" })
        }


    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const getEvent = async function(req,res){
    try{
        let eventId = req.params.eventId
        if (!validator.isValidObjectId(eventId)) {
            return res.status(400).send({ status: false, message: "Enter valid eventId" })
        }

        let event = await eventModel.findById(eventId)

        if(req.decodedToken.UserId == event.createdBy){
           res.status(200).send({status:true,message:"successful",data:event})
        }
        else{
            return res.status(403).send({ status: false, message: "authorization denied" })
        }

    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports.createEvent = createEvent
module.exports.inviteUser = inviteUser
module.exports.listEventbyFilter = listEventbyFilter
module.exports.upadateEvent = upadateEvent
module.exports.getEvent = getEvent
