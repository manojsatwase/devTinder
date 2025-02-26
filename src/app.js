const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const app = express();

const PORT = 3000;

// are middleware will now be activeted for all the routes
app.use(express.json());
// whenever any request will come my cookie will be parse and i can now access those cookie ok
app.use(cookieParser());

// Routes 
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// slash means it will run for all the routes
// first of fall it will check for slash profile route inside auth router
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

// connectDB() function call it will return a promise
// and then happy case and the bad case also over here
// this is the proper way to connect database in your application
// write way to connecting to the server and starting your application is
// first of fall connect to the database then start you application
// then basically start listening to api calls right
// start your server only after database is connected
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => console.log(`Server Is Running On PORT ${PORT}...`));
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });

/*

app.get("/user",async(req,res)=>{
    const id  = req.body._id;
  
    try {
        const user = await User.findById(id);
        res.send(user);
    } catch (error) {
        res.status(400).send("Something Went Wrong!!!")
    }

})
*/

/*
 if you are a good coder you should be validating everything 
 you can cannot trust anything thats comes from this req.body
 always make sure your PATCH, your PUT, your POST APIs 
 whenever you are getting some data never trust this req.body 
 never in your life trust req.body right this req.body can get any milicious into your database
 you never have to trust req.body ok
*/
