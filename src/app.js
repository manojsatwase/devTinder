const express = require('express');
 const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const user = require('./models/user');

const PORT = 3000;

// are middleware will now be activeted for all the routes
app.use(express.json());

// post api
app.post('/signup',async (req,res)=>{
    // Creating a new instance of the User model
    const user = new User(req.body);
    try {
        // once i do user.save() because this is an instance of model
        // and you call a dot save on top of it so this data save on to that db
        // and this function basically return a promise so most of the time you have to use promise
        await user.save();
       // res.status(201).json(user);
       res.status(200).send("User Added successfully!");
        
    } catch (err) {
      res.status(400).send("Error saving the user:" + err.message);
    }
})

// Get user by email
app.get('/user', async (req, res) => {
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
        }else{
        // If the user is found, send the user data with a 200 status
        res.status(200).send(user);
        }

    } catch (err) {
        // If there's an error, send a 400 response
        res.status(400).send("Something went wrong");
    }
});

// DELETE USER from the database
app.delete('/user',async(req,res)=>{
  try {
    const userId = await User.findByIdAndDelete(req.body.userId);
    if(!userId){
        res.status(404).send("User not found");
    }else{
       res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})

// Update data of the user
app.patch("/user",async (req,res) =>{
    const userId = req.body.userId;
    const data = req.body;
    try {
        // partiallly update & it's not present fileds in the schema
        // it will not be added into database. any other data which is apart from the schema
        // will be ignore by your APIs
        //await User.findByIdAndUpdate(userId,data)
        await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before",runValidators:true})
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("UPDATE FAILED:" + error.message);
    }
})


// Feed API - GET /feed - get all the users from the database
app.get('/feed',async (req,res)=>{
   try{
    const users = await User.find({});
    res.status(200).json(users);
   }catch(err){
    res.status(400).send("Something went wrong");
   }
})
  // connectDB() function call it will return a promise 
  // and then happy case and the bad case also over here
  // this is the proper way to connect database in your application
  // write way to connecting to the server and starting your application is 
  // first of fall connect to the database then start you application 
  // then basically start listening to api calls right
  // start your server only after database is connected
  connectDB().then(()=>{
    console.log('Database connection established...')
    app.listen(PORT,()=>console.log(`Server Is Running On PORT ${PORT}...`));
   })
   .catch(err=>{
    console.error('Database cannot be connected!!');
   })



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


