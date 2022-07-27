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


