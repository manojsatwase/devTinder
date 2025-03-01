# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

# profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/forgetPassword # Forget password

## /ConnectionRequestRouter
this was from the sender side of think
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- How will i make this status dynamic ?
- /request/send/:status/:userId

this review request api for the reciever side
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId
- How will i make this status dynamic ?
- /request/review/:status/:userId

## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you profile of other users on platform

- Status:Right swap : ignore(tinder call it as pass),left swap : interested(tinder call it as like),accepted,rejected

- Write code with proper validations for POST API "/request/review/:status/:requestId"