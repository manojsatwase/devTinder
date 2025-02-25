const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const PORT = 3000;

// are middleware will now be activeted for all the routes
app.use(express.json());
// whenever any request will come my cookie will be parse and i can now access those cookie ok
app.use(cookieParser());

// post api
app.post("/signup", async (req, res) => {
  try {
    // first think should be Validation for your data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, age, gender, skills } =
      req.body;

    // then Encrypt the password then i will save it
    // How i Encrypt the password ?
    // for that i'm used npm package that npm package is know as bcrypt
    // so this package basically gives you function to hashing your password
    // and then to also validate your password ok.
    // basically see with promises when you do bcrypt.hash it will return you a promise back
    // and how to you hash it you will just enter the plain text password
    // then you will have to enter the saltRounds how many number of rounds of salt
    // the more number of salt the taugher the password to decrypt ok
    // the more ecryption level will be the more tough your password will be more tough to break gotted
    // but the good number or basic number decent number is 10 right and it return a promise
    // if i send to strig somebody still nobody will be able to figer out that this manoj@123 => $2b$10$rlMdsQX25svg156YuHdon.2yCHSvWWha2Y3j3oPNqTbYEWg3vT6UG
    // this is the power of encryption
    // once you encrypted you cannot decrypted you cannot get the back plain text back ok
    // only the user who has enter suppose the user entering this passowrd only the knows that what was it right
    // if he has remember but this is a very tough encryption it's very hard to dcrypt this gotted this how you store password
    const passwordHash = await bcrypt.hash(password, 10);
    // How do you store this password ?

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills,
    });

    // once i do user.save() because this is an instance of model
    // and you call a dot save on top of it so this data save on to that db
    // and this function basically return a promise so most of the time you have to use promise
    await user.save(); // save this data into are dabase
    // res.status(201).json(user);
    res.status(200).send("User Added successfully!");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    // first of fall it validate emailId and password isCurrect or Not
    const { emailId, password } = req.body;
    // emailId validation

    // suppose if somebody login random emailId this emailId is not in my database
    // so first of fall i will check whether this user is present in my database or not
    // if the user is present in my database then i will check wether the password is currect or not ok
    // so How would you check ? for that i will try to find out the user
    const user = await User.findOne({ emailId });
    if (!user) {
      //throw new Error("EmailID is not present in DB");
      throw new Error("Invalid credentials");
    }

    // main logic
    // we check wether the email id and password is currect
    // how do you check it ?
    //  there is function bcrypt.compare('plain text passowrd','db store password') this return you boolean
    // and it will again a return a promise
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      //throw new Error("Password is not currect");
      throw new Error("Invalid credentials");
    } else {
      // Create a JWT Token then what will we do
      // i can basically Hide same data over here sign
      // when i'm creating a token i can Hide same data
      // what i will Hide over is ? i will Hide the user Id
      // and i will also gove a screte key over
      // here this secrete key basically a password that only i know
      // But this secreate key is a password that only server know user don't no it
      // attacker don't know it nobody know this password only the server know this passowrd ok
      // so i'm Hiding this data and i'm also giving a secreate key this secreate key is very very important ok
      // when the user is coming in the emailId and Password if the emailId and Password is currect
      // creating a token hiding the userID insided and sending the back to the user right
      // hiding the userId back sending it back to the user and client
      // Now this token also has a secreate information about who is login right
      // and userId is hidden in this token. a user Id of manoj is hidden inside this token
      const token = await jwt.sign({ _id: user._id }, "SecreateKey@$143");

      // Add the token to cookie and send the response back to the user
      // see everytime you login it will create a new token but userId is Hidden over here
      // cookie only be set when my emailId and password is currect for manoj satwase then the cookie will be set
      // and then the i will be access to the profile and only my profile and i will possible because of jwt
      res.cookie("token", token);
      res.send("Login Successfull!!!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", async (req, res) => {
 try {
     // validate my cookie
  const { token } = req.cookies;
  if(!token){
    throw new Error("Invalid Token");
  }
  // Basically i was storing the id over here when i login this is i will get back
  const decodedMessage = await jwt.verify(token,"SecreateKey@$143");
  const {_id} = decodedMessage;
  const user = await User.findById(_id);
  if(!user){
     throw new Error("User does not exist");
  }
  res.send(user);
 } catch (err) {
    res.status(400).send("ERROR : " + err.message);
 }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // it will be return one document older
    const user = await User.findOne({ emailId: userEmail });
    // If no user is found, return a 404 response
    if (user.length === 0) {
      // if you do this
      //return res.status(404).send("User not found");
      // or if you don't use return keyword then used need to use if and else
      res.status(404).send("User not found");
    } else {
      // If the user is found, send the user data with a 200 status
      res.status(200).send(user);
    }
  } catch (err) {
    // If there's an error, send a 400 response
    res.status(400).send("Something went wrong");
  }
});

// DELETE USER from the database
app.delete("/user", async (req, res) => {
  try {
    const userId = await User.findByIdAndDelete(req.body.userId);
    if (!userId) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
  // and its a good think to keep this question mark over here ok so that if the userId is not present your code will not fail
  const userId = req.params?.userId;
  const data = req.body;
  // we should validate all the fileds never trust on users or attackrs can attackyour API
  // send the malisis data and your db can break
  /* you know sometime when we are building the ui we just feel that ok user will used UI 
      always have backend validation but NO attackers wiill missused your APIs
      your backend is very velunarable you can never leave your backend less secure right
      may be you don't have UI validation that is ok but always have backend validation 
      for each and every fileds your data should be 100% secure and this is know as DATA SANITIZATION
    */

  try {
    // server level validation
    const ALLOEWD_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    // Object.keys(data) this return array of keys
    // if all of the data whatever i'm passing in every key if present then return true otherwise false
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOEWD_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Updated not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("skills cannot be more than 10");
    }

    // partiallly update & it's not present fileds in the schema
    // it will not be added into database. any other data which is apart from the schema
    // will be ignore by your APIs
    //await User.findByIdAndUpdate(userId,data)
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("UPDATE FAILED:" + error.message);
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
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
