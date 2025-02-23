const mongoose = require('mongoose');

// create a userSchema 
const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        unique:true 
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }

})
// we create mongoose model this model is created own instances
module.exports = mongoose.model("User",userSchema);