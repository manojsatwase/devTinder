const express = require('express');
 const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

const PORT = 3000;

app.use(express.json());
// post api
app.post('/signup',async (req,res)=>{
    // Creating a new instance of the User model
    try {
        const user = new User(req.body);
        // once i do user.save() because this is an instance of model
        // and you call a dot save on top of it so this data save on to that db
        // and this function basically return a promise so most of the time you have to use promise
        await user.save();
       // res.status(201).json(user);
       res.send("User Added successfully!");
        
    } catch (error) {
      res.status(400).send("Error saving the user:" + err.message);
    }
})

app.get("users",async())


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


