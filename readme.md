
Phase 1 -- user

/* registration*/

url:- localhost:5000/registration

FORMATE OF POSTMAN OF REGISTRATION:-

{
    "title":"Mr",
    "fullName":"Ranjeet Sharma",
    "email":"ranjeet@hotmail.com",
    "password":"ranjeet"
}


FORMATE OF OUTPUT

{
    "status": true,
    "message": "successful",
    "data": {
        "title": "Mr",
        "fullName": "Ranjeet Sharma",
        "email": "ranjeet@hotmail.com",
        "password": "$2b$06$k9F5tKWs1/6xVeVSFTzBx.BrovovE80uu7mluiWZjN0ml9jRhXBIa",
        "_id": "62e041747432980b4111b853",
        "createdAt": "2022-07-26T19:33:08.977Z",
        "updatedAt": "2022-07-26T19:33:08.977Z",
        "__v": 0
    }
}


for Password I have used bcrypt






/* Login*/

url:-localhost:5000/logout


FORMATE OF POSTMAN OF LOGIN:-

{
    "email":"ranjeet@hotmail.com",
    "password":"ranjeet"
}

FORMATE OF OUTPUT:-


{
    "status": true,
    "message": "login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2MmUwNDE3NDc0MzI5ODBiNDExMWI4NTMiLCJpYXQiOjE2NTg5MDM4MTJ9.1e3f-zjG8DC3SE4_09pdSgpNTPVrNRAcN8lGxMCRxKk"
}









/*Change Password*/

url:-localhost:5000/changePassword/:userId

newPassword in body json'
userid in path params

FORMATE OF POSTMAN OF CHANGE PASSWORD:-

{
    "password":"Rohit"
}


FORMATE OF OUTPUT:-

{
    "status": true,
    "message": "password change successful"
}




/*Forgot Password*/

url:-localhost:5000/forgot

use of nodeMailer with mailtrap 

FORMATE OF POSTMAN OF CHANGE PASSWORD:-

{
    "email":"ranjeet@hotmail.com"
}

FORMATE OF OUTPUT:-

{
    "status": true,
    "Message": "Mail sent successfull"
}






/*Reset Password*/

url:-localhost:5000/resetPassword


FORMATE OF POSTMAN OF RESET PASSWORD:-

token which is sent to your email id

{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2MmUwNDE3NDc0MzI5ODBiNDExMWI4NTMiLCJlbWFpbCI6InJhbmplZXRAaG90bWFpbC5jb20iLCJpYXQiOjE2NTg5MTYxNzksImV4cCI6MTY1OTAwMjU3OX0.aMM2x21FsMjERuxGGYYZBkOhJqRkEUCURqpgcn31ozE",
    "newPassword":"ranjeet@12345"
}


FORMATE OF OUTPUT:-

{
    "status": true,
    "Message": "successfull changed password"
}




Phase 2 --- Event


/*Create Event*/

url:-localhost:5000/createEvent/:userId

userId in path params


FORMATE OF POSTMAN OF CREATE EVENT:-


{
    "title":"School",
    "description":"About School Reopeing"
}


FORMATE OF OUTPUT:-

{
    "status": true,
    "message": "successful",
    "data": {
        "title": "School",
        "description": "About School Reopeing",
        "eventDate": "Wed Jul 27 2022 16:13:59 GMT+0530 (India Standard Time)",
        "createdBy": "62e041747432980b4111b853",
        "_id": "62e116ef325ede47aa291de5",
        "invitees": [],
        "createdAt": "2022-07-27T10:43:59.332Z",
        "updatedAt": "2022-07-27T10:43:59.332Z",
        "__v": 0
    }
}





/*Invite For Event*/

url:-localhost:5000/invite/:userId/:eventId

invite is send to register user only and 1 invite at a time if we want to send multiple user then loop have to create you can call this api multiple time to invite users with a email-id of user and fromate from postman 

userId in path params
eventId in path params


FORMATE OF POSTMAN OF CREATE EVENT:-


{
    "title":"School",
    "description":"About School Reopeing"
}


FORMATE OF OUTPUT:-

{
    "status": true,
    "Message": "successful invited",
    "Data": {
        "invitee": "62e128ddc7a9bd8f24e954d4",
        "invitedAt": "2022-07-27T12:00:44.010Z"
    }
}









