const { decode } = require('jsonwebtoken')
const validator = require('../middleware/validator')
const eventModel = require('../model/eventModel')
const userModel = require('../model/userModel')




const createEvent = async function (req, res) {
    try {
        let data = req.body
        let userId = req.params.userId
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like tile,fullname etc" })
        }
        const { title, description } = data

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Enter valid UserId" })
        }

        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, massage: "please enter title" })
        }

        if (!validator.isValid(description)) {
            return res.status(400).send({ status: false, massage: "please enter title" })
        }
        if (req.decodedToken.UserId == userId) {

            data.eventDate = new Date()
           

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
            return res.status(400).send({ status: false, message: "Please enter Data like tile,fullname etc" })
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


module.exports.createEvent = createEvent
module.exports.inviteUser = inviteUser
