
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

localhost:5000/invite/62e041747432980b4111b853/62e13535f777d91704c59f14

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




/*Event Filter Sorting Paganation search*/

url:-localhost:5000/list

date, title and discription in quary params pagination of 3 and sorted


FORMATE OF POSTMAN OF CREATE EVENT:-

quart params:-
title :- school
dcription:- about school
date:- mm/dd/yyy


FORMATE OF OUTPUT:-

{
    "status": true,
    "message": "successful",
    "Data": [
        {
            "_id": "62e13535f777d91704c59f14",
            "title": "School",
            "description": "About School Reopeing",
            "eventDate": "Wed Jul 27 2022 18:23:09 GMT+0530",
            "createdBy": "62e041747432980b4111b853",
            "invitees": [
                {
                    "invitee": "62e128ddc7a9bd8f24e954d4",
                    "invitedAt": "Wed Jul 27 2022 18:23:47 GMT+0530 (India Standard Time)",
                    "_id": "62e1355bf777d91704c59f19"
                }
            ],
            "createdAt": "2022-07-27T12:53:09.857Z",
            "updatedAt": "2022-07-27T12:53:47.894Z",
            "__v": 0
        }
    ]
}




/*update event */

url:-localhost:5000/update/:userId/:eventId

localhost:5000/update/62e041747432980b4111b853/62e13535f777d91704c59f14

userId in path params
eventId in path params


FORMATE OF POSTMAN OF CREATE EVENT:-

{
    "title":"School and tution",
    "description":"About School Reopeing"
}

FORMATE OF OUTPUT:-

{
    "status": true,
    "message": "update successful",
    "Data": {
        "_id": "62e13535f777d91704c59f14",
        "title": "School and tution",
        "description": "About School Reopeing",
        "eventDate": "Wed Jul 27 2022 18:23:09 GMT+0530",
        "createdBy": "62e041747432980b4111b853",
        "invitees": [
            {
                "invitee": "62e128ddc7a9bd8f24e954d4",
                "invitedAt": "Wed Jul 27 2022 18:23:47 GMT+0530 (India Standard Time)",
                "_id": "62e1355bf777d91704c59f19"
            }
        ],
        "createdAt": "2022-07-27T12:53:09.857Z",
        "updatedAt": "2022-07-27T13:56:35.105Z",
        "__v": 0
    }
}



/*details of event by path params*/


url:-localhost:5000/event/:eventId

localhost:5000/event/62e13535f777d91704c59f14

eventId in path params



FORMATE OF OUTPUT:-

{
    "status": true,
    "message": "successful",
    "data": {
        "_id": "62e13535f777d91704c59f14",
        "title": "School and tution",
        "description": "About School Reopeing",
        "eventDate": "Wed Jul 27 2022 18:23:09 GMT+0530",
        "createdBy": "62e041747432980b4111b853",
        "invitees": [
            {
                "invitee": "62e128ddc7a9bd8f24e954d4",
                "invitedAt": "Wed Jul 27 2022 18:23:47 GMT+0530 (India Standard Time)",
                "_id": "62e1355bf777d91704c59f19"
            }
        ],
        "createdAt": "2022-07-27T12:53:09.857Z",
        "updatedAt": "2022-07-27T13:56:59.900Z",
        "__v": 0
    }
}


postman file is attached with it name:- outshade.postman




