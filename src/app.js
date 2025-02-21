const express = require('express');

const app = express();

const PORT = 3000;

// Question : Can you guess What is the Output of this code ?
// if we not sending any response
app.use("/user",(req,res)=>{
    // Route Handler 1
})
//Ans Infinate Sending Request

// Question : Can you guess What is the Output of this code ?
// if we not sending any response and log console over here
app.use("/user1",(req,res)=>{
    // Route Handler 1
    console.log("rote handler user 1");
})

// now what will happen will it return route handler 1 or 2 ?
// think abouted take pause and think abouted what is responsen will be if i hit over here ?
app.use("/user2",(req,res)=>{
    console.log("There can be multiple route haandler");
    // Route Handler 1
    res.send("Route handler 1");
},(req,res)=>{
   // Route Handler 2
   res.send("Route Handler 2")
})
// Ans:Route handler 1

//--------------------------------------------

// Question: what will happen now can you guess 
// now we are not returning any resonse from here 
// so what will happen now can you guess my dear friends
// what will happen now ? what is your ans ?
// will it go the second route handler ? 
app.use("/user3",(req,res)=>{
    console.log("There can be multiple route haandler");
    // Route Handler 1
},(req,res)=>{ 
   // Route Handler 2
   res.send("Route Handler 2")
})

// Ans: It will go into infinate loop

//-------------------------------------------------------

// express does not automatically do that 
// suppose if you are not sending any response from the route handler
// your response will hang your request will hang and i will not send any response back right

// Question: now How will it go next response handler 
// suppose if i not sending the reponse from here first route
// it will go to second route and how it will go ?
// for that express say that you how one more parameter over here 
// which is know as next(); and if you call the next function over here
/* Now can you guess What will Happen ?*/
// Now do you think that second response will be printed or not ?
// tell me ?
// now you must be thinking manoj you just show a dream and then it does not work the way you say right
// what do you think what happen now ? if i hit api user4 it will go to second route handler or not ?
// tell me ? what will you see in the response 

app.use("/user4",(req,res,next)=>{
     // Route Handler 1
    console.log("There can be multiple route handler");
    // this is middleware function
    // it will call this function it will go to the nect route handler
    next();
},(req,res)=>{
   // Route Handler 2
   res.send("Route Handler 2")
})
// You will actually see the second response 
// ANS : Route Handler 2

//--------------------------------------------

// now let me ask you basic question 
// what if did this i'm writting res.send() and i'm also calling the res.next()
//Question: now what will happen can you guess ? 
app.use("/user5",
    // this function exected inside the call stack and you know right
    // javascript does not wait for none time tide and javascript waits for none
    // as soon as we give this code to call stack rigth
    // the execution context is created and code is run line by line
    // so how this code is run 
    // console.log it will be printed response will be send back to the postman
    // and then this next() function will be call and when you call this next function
    // it will go to the second route handler
    // in the second route handler again this function will be executed line by line 
    // and again this console log will be printed on the console do you see this
    // and are code will throw an error when you are trying to send another response through the same url 
    (req,res,next)=>{
    console.log("There can be multiple route haandler");
    // Route Handler 1
    res.send("Route Handler 1")
    res.next();
},(req,res)=>{
   // Route Handler 2  
   console.log("Handling the route user 2!!")
   res.send("Route Handler 2")
})

// ANS:it will give the first Route Handler 1 response

// why it's showing an error ?
/*
because see can Cannot set headers after thy are sent to the client
because we have already send the response to the client now you can not change the request
what happen TCP connection made remember between client and server are postman is an client
we have are server and now TCP connetion is made it's open up this connection it's send the data back 
and it's close the connection and close the connection is loss are postman has got the response
but on the server we are still my code is still trying to send more response
it will not work it will throw and error ok 
as a developer we should never write like this gotted

*/
// ----------------------------------------------------------

// Now another output question
// What will happen now ? tell me 
/*
now you would have trust issue express and you would have trust issue with my teaching style
that manoj you are just confusing me again and again but i'm not confusing you
i'm just telling you all the scenarios and if you want to be a good developer you should know 
all this small thinks it will you give confident when you will write code
because you will exactly know when you are writting this what is happening
learn it slowly and properly and you will get confidents when will you write the code
can you guess firs of falll what will happen will i see Response 
will i see 2nd Response!! will i see both what will happen ?
*/
app.use("/user6",(req,res,next)=>{
    console.log("There can be multiple route haandler");
    // Route Handler 1
    next();
    res.send("Response!!")
},(req,res)=>{ 
   // Route Handler 2
   res.send("2nd Response!!")
}) 
// lets go back and send the response it get the 2nd Response!! now you know
/* why you get the second response but do you get an error yes
yes we got an error Cannot set headers after they are sent to the client
why we get an error again why we did get an error again ?
you know you will have to go back to session1 you will have to see how javascript code 
is executed inside the call stack and the you will realize what happen right
let me tell you what happen in this case as soon as we call /user6
it went over here and this function was running line by line ok it printed console log 
then it call next so as soon as this call this function next it basically call this function
now this function goes to the call stack  and execute line by line execution context is made
and that code is running line by line and what it will do  it will send the response back 
and this function is finish executing. executing context move out from the call stack
and now this next code is finish now it will go and run line number 141 over here right
this think it will call and you get an error over here
because you are trying to send a response again to the client 
when the request is already fullfill gotted this is how the code works
*/

app.listen(PORT,()=>console.log(`Server Is Running On PORT ${PORT}...`));

