const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// create a userSchema 
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
        trim: true   
    },
    lastName:{
        type:String,
        trim: true,
        maxLength:20
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
        max:100,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:{
            values: ["male","female","others"],
            message: `{VALUE} is not a valid gender type `
        }
        /* custom validation function and this function only be run when we are creating are new object
         but suppose if i'm trying to update and i'm trying to patch and existing data
         this validate function will not run by default you will have to enable it to run on update also
         how do you enable on update ?
         runValidators:true when you are updating pass as option
         */

        // validate(value){
        //     if(!['male','female','others'].includes(value)){
        //         throw new Error('Gender data is not valid');
        //     }
        // }

      
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
        type:String,
        default: "This is default about of the user"
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

userSchema.methods.getJWT = async function (){
   // whenever you create a instance of model so basically all this documents right
   // this manoj ,  this deepika, all of this are instances of this user module essented 
   // when i refere to this over here it will represent that perticular instance
   const user = this; 
   const token = await jwt.sign({ _id: user._id }, "SecreateKey@$143", {
        expiresIn: "7d",
     });
     return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
   const user = this;
   const passwordHash = user.password;
   //bcrypt.compare('comming from the request which the user enter','this.password')
   const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
   return isPasswordValid;
}

userSchema.methods.getPasswordHash = async function(password){
    const passwordHash =  await bcrypt.hash(password, 10);
    return passwordHash;
}

// we create mongoose model this model is created own instances
module.exports = mongoose.model("User",userSchema);

// this is the userSchema that we created now what is this userSchema ?
// this user Schema basically defined the user so what i can do is
// i can attach few methods on to this schema that is applicable for all the user
// what are this methods ?
// this methods are helper methods that is very closely related to user   


/*
index explaination:-
suppose if you have to 1 million records in your 1 million users
suppose there are 100 people the name virat right. 
virat khli , virat saini virat anything right virat agraval virat thygi virat something right
there are many people with virat. and you want to find any user with the user name right
suppose if you want to do a search query when i say search query that means i'm doing User.find() right
whenever i'm finding something if i do by first name and there are million of records 
my DB will take a lot time to return me the request if there are one million entries 
my DB can take 5 seconds 10 seconds and your api will just wait right 
remember you might have seen lot applications where your api take a lot of times
thats because the DB will take time to find out all the virat kohli or all the virat from the whole Databeses right
it becomes very tough to for doing the search operation
because DB will have to actually go to each and entry and find out oh is it virat , is it virat ....
so one by one DB will find out right.how you will find out ? 
one by one it will go to each user and find out who are virat and give you the Dta back 
But if you keep a index in your DATABSE if you will create index in your Database on the first name
then you query that DB will Optimise itself like that your query will became very very fast
so suppose i'm creating first name as an index right first name as an index
so what will happen ? whenever i will query something then the with the first name  
if i'm query first name i have make the first name as an index
so if i do User.findOne({firstName:"virat"}) so if i'm making this DB query
so i'm put the index on firstname if the firstname index is there then this query will be very fast 
if index is not there then the query will be very very slow
as the db will grow this queries become very very expensive and very very slow right
they can even beecome so expensive that they can HANG your Database your Databse will be HANG
and it will be a very BIG trable for you my dear friends ok
so whenever your are doing search operation be very mindfull what index you are keeping
so now i don't want to keep a index for firstName because we are not search Name of firstName right
what we are doing is we want to index on emailId because a lot of time we want to find user by emailId essented
a lot of time you find user by emailId why ? everytime on login we will find user by emailId essented 
remember right remember let me show you the auth api in the login api
you find the emailId did you see this User.findOne({emailId}); you did this right
suppose if i don't have index on my emailId then your loggin API will become very slow
because the Dabase will have to go one by one , one by one , one by one 
and check out where is the emailId gotted so emailId should be index over here  

But let me tell you good feature about MongoDB if you are making a filed as unique 
if you are saying that ok emailId is unique MongoDB automatcally create a index for that right
MongoDB automatcally create a index for unque:true right
you go to the documentation and read it out see this
you can also defined MngoDb indexs using schema tye options right
so if you do index:true index equal to true it will create a index like this
if you do unique:true it will create a index automatically for you right
so if i'm doing unique:true i don't need worried about effiency of the API 
if i'm findind a emailId in my Databse ok so this uqniue equal to true 
means i'm good with it right this is my index query right
you don't have to worried abouted 

But if you want to do with firstName so basically you have to basically either set it unique right
either set it unique equal to true or you can either right index equal to true over here right
this is also you can right. cool if you write index equal to true
that means this will be index
firstName:{
 index:true, // we can put unque over here because it will be a bigger problem 
 because then there will be no to user with the same first name can exist i can't put this 
 so i can put a normal index over here the query will be much faster if you will put index equal to true ok
 this how you do it this is a index which i talk about
}
*/

/*
Compound Index :-
if there is a use case i have to find the user this is the very comman query ok
so if i find the user like this right
User.find({firstName:"manoj",lastName:"satwase"});
suppose if i have have to find the user firstName and LastName right
if i have to find the user like this and there are million of entries in my user table
so what will i do it will make seance for me to create a index
and i will create index not just on a one filed i will create index on a compound index on both the fileds right
i will do something like this i will keep it an accending

userSchema.index({firstName:1,lastName:1});

so basically when you write 1 or -1 it will Optimize such queries right so this basically you know it will optimize such queries right
and 1 and 1 it will change the order of how MongoDB store the Databse right
store the entry in the Database it's internal concept you don't have to worried abuted
but this is how you set the index and this is know as the compound index read more abouted

and good way to write index like this if the use case is needed
userSchema.index({firstName:1});
userSchema.index({skills:1});

But lot of students also have one question right
that then we should if it will make it fast then what will do 
let us just create indexs you know let us just create index on every fileds right
it will make sence MongoDB will Optimize it But le me tell you
creating index unnecessary also comes with the cost and this is my homework to find out why
why shuld we not create lot of indexes into the DB because see
when you create a index you don't have to do heavy job but DB it's take very touph time for DB handle those indexes ok
DB has to store the Data in a such a way that your query becomes faster DB has to store
altimatly inside dabatabse also there is data stracture there is a some algorithms runniung in
there is query pattern witch is return in right there is databse build using tree right 
there are datastructure running behind the scence right.
what i'm trying to say is if you are creating a lot of indexes then it becomes touph for DB to handle those indexes also ok  
don't create random index when you don't needed alway be very specific about what index that you created
and generally when you are starting slow when you are starting new there is no need of creating in index right
if suppose your application is having 100 users or 1000 users you really don't need create indexes right
*/