const express = require('express');

const app = express();

const {adminAuth} = require('./middlewares/auth');


const PORT = 3000;

app.use("/",(err,req,res,next) => {
    if(err){
        // Log your error
        res.status(500).send("something went wrong");
    }
})

app.listen(PORT,()=>console.log(`Server Is Running On PORT ${PORT}...`));

