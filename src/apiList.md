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
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests/received
- GET /user/feed - Gets you profile of other users on platform

- Status:Right swap : ignore(tinder call it as pass),left swap : interested(tinder call it as like),accepted,rejected