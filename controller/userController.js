const userModel = require('../model/userModel')
const validator = require('../middleware/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')
const nodemailer = require('nodemailer')

const registration = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Data like tile,fullname etc" })
        }
        const { title, fullName, email, password, } = data

        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, massage: "please enter title" })
        }
        let titl = ['Mr', 'Mrs', 'Miss']
        if (!titl.includes(title)) {
            return res.status(400).send({
                status: false, message: " Please Enter title like:- Mr, Mrs, and Miss ...it is required"
            })
        }

        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, massage: "please enter fullName" })
        }


        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, massage: "please enter email" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, massage: "please enter correct email like:- abc@gmail.com" })
        }
        const user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(400).send({ status: false, message: 'email already in use' })
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, massage: "please enter password" })
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(400).send({ status: false, massage: "please length should be 6 to 15 password" })
        }
        const hash = bcrypt.hashSync(password, 6);
        data.password = hash

        let createUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "successful", data: createUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        Data = req.body

        if (Object.keys(Data) == 0) {
            return res.status(400).send({ status: false, message: "Please provide email id or password" })
        }
        const { email, password } = Data;
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: `Email is required` })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: `Email is not correct ` })
        }

        if (!validator.isValid(password)) {
            res.status(400).send({ status: false, message: `password is required` })
            return
        }

        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(401).send({ status: false, message: 'email is wrong' })
        }
        const decrpted = bcrypt.compareSync(password, user.password);
        if (decrpted == true) {
            const token = await jwt.sign({
                UserId: user._id,
            }, 'outShade')

            return res.cookie('x-api-key', token).status(200).send({ status: true, message: "login Successful", token: token })
        } else {
            res.status(400).send({ status: false, message: "password is incorrect" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const logoutUser = async function (req, res) {
    try {

        res.clearCookie('x-api-key').status(200).send({ status: true, Message: "Successful logout" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const ChangePassword = async function (req, res) {
    try {
        let password = req.body.password
        let userId = req.params.userId
        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Please provide valid userid" })
        }
        const u_details = await userModel.findById(userId)
        if (!u_details) {
            return res.status(404).send({ status: false, message: "user not found" })
        }
        if (!validator.isValid(password)) {
            res.status(400).send({ status: false, message: `password is required` })
            return
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(400).send({ status: false, massage: "please length should be 6 to 15 password" })
        }


        if (req.decodedToken.UserId == userId) {
            const hash = bcrypt.hashSync(password, 6);
            let changePassword = await userModel.findOneAndUpdate({ _id: userId }, { $set: { password: hash } }, { new: true })
            return res.status(200).send({ status: true, message: "password change successful" })

        } else {
            return res.status(403).send({ status: false, message: "authorization denied" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const forgotPassword = async function (req, res) {
    try {
        const email = req.body.email
        if (!validator.isValid) {
            return res.status(400).send({ status: false, message: `Email is required` })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, message: `Email is not correct ` })
        }
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(401).send({ status: false, message: 'email is wrong' })
        }
     
        const token = await jwt.sign({
            UserId: user._id,
            email:email
        }, 'outShadeEmail',{expiresIn: '24h'})

        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "8b0d6cdc6c82df",
                pass: "e5fe02dc487f3f",

            }
        });

        var mailOptions = {
            from: '"outShade Team" <no-reply@outshade.com>',
            to: `${email}`,
            subject: 'Reset Password',
            text: `Hi ${user.fullName}, There was a request to change your password!
                  If you did not make this request then please ignore this email.;) `,
            html: `<b>Hey ${user.fullName}</b><br> There was a request to change your password!</br>If you did not make this request then please ignore this email. Copy Token:-<strong>${token} </strong>and paste token on website<a href='localhost:5000/resetPassword'>Link</a> <button href='localhost:5000/resetPassword'>Click Here</button>`,
            auth:{
                email:email,
                token:token
            }
        };

        transport.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).send({ status: false, message: error.message })
            } else {
                console.log('Email sent: ' + info.response);
                
                await userModel.findOneAndUpdate({_id:user._id},{$set:{forgotToken:token}})
                return res.status(200).send({status:true,Message:"Mail sent successfull"})
            }
        });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const resetPassword = async function (req, res) {
    try {
        const token = req.body.token
        const newPassword=req.body.newPassword

        const decoded = jwt.verify(token, 'outShadeEmail')
         let user = await userModel.findOne({_id:jwt.decode.UserId})

        if(decoded){
            const hash = bcrypt.hashSync(newPassword, 6);

           let changepassword = await userModel.findOneAndUpdate({_id:decoded.UserId},{forgotToken:null,password:hash})
           return res.status(200).send({status:true,Message:"successfull changed password"})
        }else{
            return res.status(401).send({ status: false, msg: "invalid authentication token" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





module.exports.registration = registration
module.exports.loginUser = loginUser
module.exports.logoutUser = logoutUser
module.exports.ChangePassword = ChangePassword
module.exports.forgotPassword = forgotPassword
module.exports.resetPassword = resetPassword