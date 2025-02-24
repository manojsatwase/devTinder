const mongoose = require('mongoose');
const validator = require('validator');

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
        trim:true,
        validate(value){
         if(!validator.isEmail(value)){
          throw new Error(`Invalid email address: ${value}`);
         }
        }
    },
    password:{
        type:String,
        required:true,
        minLength: 8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password:" + value);
            }
        }
        /*
        we store are password in plain text over here right we can read it
        but are password should not be store into are database there are a lot of security issue
        if you store password like this becase this password are readble i can read it
        so the password should be store in a HASH Format 
        password should be store in a Encypted Format and nobody should be able to see the in the database
        suppose in the signup api when the user is registering on to the platform
        when there is calling signup api and if there is given the password manoj@123
        the password store in the database should not be manoj@123 it should be HASH of the password
        ENCRYPTED PASSWORD SHOULD BE STORE INTO THAT DATABSE
        */
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
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error(`Invalid Photo URL address: ${value}`)
            }
        }
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