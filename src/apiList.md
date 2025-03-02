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
- GET /user/requests/received
- GET /user/connections // give the informaton who is connected to me who is basically my connection who is accepted my request right
- GET /user/feed - Gets you profile of other users on platform

- Status:Right swap : ignore(tinder call it as pass),left swap : interested(tinder call it as like),accepted,rejected

- Write code with proper validations for POST API "/request/review/:status/:requestId"
- Thought process - POST vs GET
- POST APIs means the user are trying to enter some data into the database 
- GET APIs i'm trying to fetch the data from the database 
- 
- How can i attacker exployed your POST API ?
- see they can attack your post apis by sending some random data into your api and then you mistakaly put that into your database. if you put some data into the database which was not suppose to be accidentally that is the attacker opportunity that is something you don't have to do as a gargiant of the database.
- whenever there is a POST APIs the though process is very different think whenever there is POST APIs think of the attacker as this attacker can put something into my database and i should have an OCD that i will verify every thing which is coming in my request. i will verify each and everything. i will make sure that i'm 100% 
- whenever you are writting anytime this thing right. this is the most important line ConnectionRequest.save() this line should be the second last line of your any APIs
- why ?
- because see before saving you have to do a lot of checks lot of checks lot of checks All the checks at each level that 
- Data should not be validatate 
- Data should be sanitized
- Attacker can not put anything random into your database
- This should be the THOUGHT PROCESS ok
- 
- While writting GET APIs the THOUGHT PROCESS changes very differently because know the user does not pass any information right. what the user can do is 
- see the Thread to POST APIs is that user can millicially enter wrong data into the database
- Now APIs Threads is the attackers opportunity is that from the GET APIs your getting some information from the database. now database should be very safe.
- Now in this GET APIs we will 100% make sure that we are sending only allowed data. we are very much sure about things that ok only the data whatever data sending back to the user it's 100% sure that the user is authorize. 100% sure that the user is suppose the user trying to request the connection request of deepika suppose i'm manoj right i'm trying to Hit an API an i'm trying to find the  connection Request of which deepika has got that should not be allowed we should be 100% make sure that the loggedIn User is a verify user and whatever he is requesting is the currect information which is allowed in his scope because see DATABASE is very Open right over here you have all the data. DATA IS THE NEW OIL and a lot of people also think that the next world war will happened because of data right there was a good jock arounded that ok next world war will not happened because of OIL the next world war can happen because of data right
- and data is very very important thinks right in today is world data leak can be very dangers and that happen because some developers right have give the opportunity to access the data illegally right and attacker can missused that opportunity right
- so Thought process is very different always make sure in the get APIs you are very sure about what you are sending back to the user ok now when we write this APIs you will understand it properly 
- while writting GET APIs i will also tell you one more important concept right inside Mongoose and you will love it rigth it's basically kind of making relation between to collection right we will make a relation an a Reference between two collection we will see it very soon But lets us just start writting are APIS ok
- 
- Read about ref and populate: https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
- 
- Create GET /user/connections