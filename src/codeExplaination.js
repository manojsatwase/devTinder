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

//---------------------------------------------------------------------

/*
lets play with code   
so this is my route handler ans i'm calling next over here 
i'm sending 2nd response over here
so what will be print and i'm not calling next and anything
so what will you think this will be printed 
what will be printed over here
*/

app.use("/user7",
(req,res,next)=>{
 console.log("Handler the route user!!");
 next();
},
(req,res) => {
    console.log("Handling the route user 2!!");
    res.send("2nd Response!!");
},
(req,res) => {
    console.log("Handling the route user 3!!");
    res.send("3nd Response!!");
},
(req,res) => {
    console.log("Handling the route user 4!!");
    res.send("4nd Response!!");
}
)

/*
so the anwser would be 2nd Response!! why
will you see error right
the first question is what will be printed 
will you get error or not
so error will not be there and 2nd Response will be printed why
it's go to the this first route it goes to this code right it will run this code
see "Handler the route user!! over here then it will call next
when you call the next it goes to the next route it will handle this right
Handling the route user 2!! the it will go to response dot send
second response right and then it send back the response 
and now it will not go forthere this 3rd and 4th route handler will never be called 
because they can only be called if the next() function was call from here 3rd route 
and you don't send the 2nd response right
now what will happen
*/

app.use("/user8",
    (req,res,next)=>{
     console.log("Handler the route user!!");
     next();
    },
    (req,res,next) => {
        console.log("Handling the route user 2!!");
       // res.send("2nd Response!!");
       next();
    },
    (req,res) => {
        console.log("Handling the route user 3!!");
        res.send("3nd Response!!");
    },
    (req,res) => {
        console.log("Handling the route user 4!!");
        res.send("4nd Response!!");
    }
    )
    /*
  lets go back and send the response you will see 3rd Response!! over here essented
  it will see third response and it will not go any forther we will see tbis right
  and in the third response also if just comment his 3rd Response
  and call next over here it will go to the 4th Response!! right
  will it go to 4th Response yes it will go to the 4th Response!!
  and all of this 4 route ver call now
    */

  app.use("/user9",
    (req,res,next)=>{
     console.log("Handler the route user!!");
     next();
    },
    (req,res,next) => {
        console.log("Handling the route user 2!!");
       // res.send("2nd Response!!");
       next();
    },
    (req,res,next) => {
        console.log("Handling the route user 3!!");
        //res.send("3nd Response!!");
        next();
    },
    (req,res,next) => {
        console.log("Handling the route user 4!!");
        res.send("4nd Response!!");
    }
    )

    /*
       now what if i don't send from the 4th Response Handler alse
       and i just call next what will happen my dear friends
       what will happen ? tell me again this is again a corner case
       i'm a software engineer and i love handling corner case 
    */
  app.use("/user10",
    (req,res,next)=>{
     console.log("Handler the route user!!");
     next();
    },
    (req,res,next) => {
        console.log("Handling the route user 2!!");
       // res.send("2nd Response!!");
       next();
    },
    (req,res,next) => {
        console.log("Handling the route user 3!!");
        //res.send("3nd Response!!");
        next();
    },
    (req,res,next) => {
        console.log("Handling the route user 4!!");
        //res.send("4nd Response!!");
        next();
    }
    )
    /*
        it will get an error it will not able to find path why
        and it will see over here alll console log will be printed 
        basically the code was running but it say that can not get user
        why ?
        the reasion is we are calling the next over here and now 
        express is expecting you another route handler over here 
        because we have not defined the route handler that means 
        it say that i can not get the route handler for this gotted 
        so basically think about express. express feel that ok there must be
        same other route handler also becase that is why i'm calling next over here right
        but we don't have route handler that is why it's breaking
        what if i don't call it next() and leave it EMPTY 
        WHAT WILL HAPPEN NOW ?
        will it throw an error?
        now i will go back and show it to you it will not show an error
        But it will hang
    */

        app.use("/user11",
            (req,res,next)=>{
             console.log("Handler the route user!!");
             next();
            },
            (req,res,next) => {
                console.log("Handling the route user 2!!");
               // res.send("2nd Response!!");
               next();
            },
            (req,res,next) => {
                console.log("Handling the route user 3!!");
                //res.send("3nd Response!!");
                next();
            },
            (req,res,next) => {
                console.log("Handling the route user 4!!");
                //res.send("4nd Response!!");
                //next();
            }
            )

/*
why it's hanging because i'm not handling this route came in over here 
and i'm not handling it but if i call next over here 
that means there will be an error because there is no route handler there
there is no route handler its expecting one more route handler
that send the response back right
*/
app.use("/user12",
    (req,res,next)=>{
     console.log("Handler the route user!!");
     next();
    },
    (req,res,next) => {
        console.log("Handling the route user 2!!");
       // res.send("2nd Response!!");
       next();
    },
    (req,res,next) => {
        console.log("Handling the route user 3!!");
        //res.send("3nd Response!!");
        next();
    },
    (req,res,next) => {
        console.log("Handling the route user 4!!");
        //res.send("4nd Response!!");
        next();
    }
    )
    /*
    see express want that make how many route handler you want to
    but at the end the response should be send ok response should be send right  
    and if i go handle the firth Response and if i run the code
    now it will work as expected 5th response will be printed over here gotted
    */

    app.use("/user12",
        (req,res,next)=>{
         console.log("Handler the route user!!");
         next();
        },
        (req,res,next) => {
            console.log("Handling the route user 2!!");
           // res.send("2nd Response!!");
           next();
        },
        (req,res,next) => {
            console.log("Handling the route user 3!!");
            //res.send("3nd Response!!");
            next();
        },
        (req,res,next) => {
            console.log("Handling the route user 4!!");
            //res.send("4nd Response!!");
            next();
        },
        (req,res,next) => {
            console.log("Handling the route user 5!!");
            res.send("5nd Response!!");
        }
        )

 /*
   and you can also send array of object and it will works exactly the same
   exactly the same gotted and now you can also mix and match 
 */

   app.use("/user12",
    [(req,res,next)=>{
     console.log("Handler the route user!!");
     next();
    },
    (req,res,next) => {
        console.log("Handling the route user 2!!");
       // res.send("2nd Response!!");
       next();
    },
    (req,res,next) => {
        console.log("Handling the route user 3!!");
        //res.send("3nd Response!!");
        next();
    },
    (req,res,next) => {
        console.log("Handling the route user 4!!");
        //res.send("4nd Response!!");
        next();
    },
    (req,res,next) => {
        console.log("Handling the route user 5!!");
        res.send("5nd Response!!");
    }]
    )

// it will again behaviour the same
    app.use("/user13",
        [(req,res,next)=>{
         console.log("Handler the route user!!");
         next();
        },
        (req,res,next) => {
            console.log("Handling the route user 2!!");
           // res.send("2nd Response!!");
           next();
        }],
        (req,res,next) => {
            console.log("Handling the route user 3!!");
            //res.send("3nd Response!!");
            next();
        },
        (req,res,next) => {
            console.log("Handling the route user 4!!");
            //res.send("4nd Response!!");
            next();
        },
        (req,res,next) => {
            console.log("Handling the route user 5!!");
            res.send("5nd Response!!");
        }
        )
    /* this is what i wanted to show you how you can add multiple route handlers
    how you can add multiple route handler function over here in this app.use
    you can not just use you can just used it inside app.get and you can used inside post,patch,put,delete
    anywhere this will work right 
    all of the methods all of this function all will work the same why with this route handler gotted
    now this is what i wanted to tell you

    */