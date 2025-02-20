const express = require('express');

const app = express();

const PORT = 3000;

// basic fundamental to your head 
// that order of writting the code order of writting the route matter a lot ok 
app.use("/hello/2",(res,res)=>{
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

/*----------------*/

// three ways we can get the data this is how you read the query parameters
// req.query , 
// req.query => localhost:3000/user?user=123&page=1 
/*
   what if you want to make route dynamic
   req.params:localhost:3000/user/123 how do you handle this dynamic api
*/
// send the data
// req.body

app.listen(PORT,()=>console.log(`Server Is Running On PORT ${PORT}...`));

