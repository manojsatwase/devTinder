const express = require('express');

const app = express();

const PORT = 3000;

// basic fundamental to your head 
// that order of writting the code order of writting the route matter a lot ok 
app.use("/hello/2",(res,res)=>{
   // Route Handler
   res.send("Abracadabra");
})

app.use("/hello",(res,res)=>{
    res.send("Hello hello hello!");
 })

 app.use("/test",(res,res)=>{
    res.send("Namaste Manoj!");
 })


 /*-------------- */

 // all the route matching over here because order matter 
// this other never got a chance to execute
app.use("/user",
   // this is basically controller , route handaler
   (req,res)=>{
   res.send("HAHAHAHAHA");
})

// This will only handle GET call to /user
app.get("/user",(req,res)=>{
   res.send({firstName:"Manoj",lastName:"Satwase"})
})

app.post("/user",(req,res)=>{
   res.send("Data successfully saved to the database")
})

app.get("/user",(req,res)=>{
   res.send("Deleted Successfully");
})


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
/*----------------*/

// three ways we can get the data this is how you read the query parameters
// req.query , 
// req.query => localhost:3000/user?user=123&page=1 
/*
   what if you want to make route dynamic
   localhost:3000/user/123 how do you handle this dynamic api 
   req.params
*/
// send the data
// req.body

app.listen(PORT,()=>console.log(`Server Is Running On PORT ${PORT}...`));

