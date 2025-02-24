const mongoose = require('mongoose');

// create a userSchema 
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
        trim: true   
    },
    lastName:{
        type:String,
        trim: true
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength: 8
    },
    age:{
        type:Number,
        min:18,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        /* custom validation function and this function only be run when we are creating are new object
         but suppose if i'm trying to update and i'm trying to patch and existing data
         this validate function will not run by default you will have to enable it to run on update also
         how do you enable on update ?
         runValidators:true when you are updating pass as option
         */
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error('Gender data is not valid');
            }
        }
    }, 
    photoUrl:{
        type:String,
        default: "https://geographyandyou.com/images/user-profile.png"
    },
    about:{
        type:String
    },
   skills:{
    type:[String],
    default: []
   }, 
},{
  // mongodb createdAt and updatedAt for every user that register on to are platform
  // by default it will added you don't have to add extra thinks
  timestamps:true
})
// we create mongoose model this model is created own instances
module.exports = mongoose.model("User",userSchema);