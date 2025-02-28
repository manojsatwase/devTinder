 - Create a repository
 - Initialize the repository
 - node_modules, package.json,package.lock.json
 - Install express
 - Create a server
 - Listion to port 3000
 - Write request handlers for /test,/hello
 - Install nodemon and update scripts inside package.json
 - What are dependancies
 - What is the use of "-g" while npm install
 - Difference betwwen caret and tilde (^ vs ~)
 
 - initialize git
 - gitignore 
 - Create a remove repo on github
 - Push all code to remote origin
 
 - Play with routes and route extensions ex. /hello , / , hello/2 , /xyz
 - Sequence of Order of the routes matter a lot 
 
- Install Postman app and make a workspace/collection > test API call

- Write logic to handle GET,POST,PATCH,DELETe API Calls and test them on Postman

- Explore routing and use of ?, + , () , * in the routes
- Use of regex in routes /a/ , /.*
- Reading the query params in the routes
- Reading the dynamic routes

-  Handling Route Handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route",rH,[rH2,rH3],rH4,rH5);
- what is Middleware ? Why do we need it ?
- How express JS basically handles requests behind the scence
- Difference between app.use VS app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error Handling using app.use("/",(req,res,next) => {});

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library 
- Connect your application to the database <"Connection-url">/devTinder
- Call the connectDB function and connect to dababase before starting application on 3000 

- Create a userSchema & user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try , catch

- What is the different between javascript object and JSON
- Add the express.jsob middleware to your app
- Make your signup API dynamic to recieve data from the end user
- if we are doing User.findOne with duplicate email ids , which object will be returned
- API - Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID using findById();
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documentation for Model Methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

- Explore schematype options from the documentation
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUY all appropriate validations on each field in Schema
- Add timestamps to the userSchema 
- Add API level validation an Patch request & Signup post api
- DATA Scenotazation add API validation for each fileds
- Install validator
- Explore the validator library function and Use validator function for password, email, photoUrl
- NEVER TRUST req.body

- Validate data in Signup API
- Install bcrypt package
- Create passwordHash using bcrypt.hash & save the user is encrypted password
- Create Login API
- Compare passwords and throw errors if email or password is invalid 

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- // IN login API, after email and password validation create a JWT token and sent it to user back inside cookie
- read the cookie inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middleware in profile and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to  7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)
- your variable should not be random variable the code that you write that computer to understand or human to understand ?
- the code that you write is human to understand humans not the computer so always be clear when you write
- your code should be readable and now a lot of peaple say that we write code so that computer can understand No computer can understand binary also but that does not means we will write binary because we can't write binary because it's not human readable we are working with js with the high level languages we are working with nodejs express framework just because it's became easier for us coputer can maching it can understand like random thinks you give it to us but this code is for human to understand ok when human is understand you should always be clear what name you put in right no matter how long your valiable.

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple route under respective router
- Read documentation for express.Router
- Create routes folder for managing auth,profile,request routers
- create authRouter, profileRouter,requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Make sure you validate all data in every POST,PATCH apis

- Create Connection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about ALL corner cases
- $or query or $and query in mongoose 
- Schema.pre("save") function
- 
- Read more abouted indexes in MongoDB
- why do we need index in DB ?
- What is the advantage and disadvantage of creating ?
- Read this articale about compound indexs: https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- Logical Query Operators : https://www.mongodb.com/docs/v6.0/reference/operator/query-comparison/
- Logical Query : https://www.mongodb.com/docs/v6.0/reference/operator/query-logical/
- Lession Is : ALWAYS THINK ABOUT CORBER CASES : ans always think that you leave a corner case and attacker can attack that corner case and can missup your database ok always think about corner cases right because any attacker will not leave your APIs if anybody get your API then can just pass anythink random to it right