const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    // this is the sending from user id
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User", //this is the reference to the user collection if you want relation or link between two collection 
      required:true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User", // reference to the user collection
      required:true,
    },
    status: {
      type: String,
      required:true,
      // you careate enum for whenever you want restrict from same values ok
      // you can create enum at the place where you want to restrict user for values
      // so the status can be 4 ignore,interested,accepted,rejected
      // this are the only 4 thinks that came into a status apart from everything else
      // right everything else should throw an error right this is the enum
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// before i save into db this function will be call 
// everytime you save this will be call and this will check if the user is same us the current user
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if the fromUserId is same as toUserId
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection request to yurself!!!");
  }
  next();
})

// Create a compound index on fromUserId and toUserId to enforce uniqueness
// so this 1 means accending order -1 means decending order
// and MongoDB will take care of all the Optimization making the query is fast
// everything will done by MongoDB you just have to set the index right
// as a software engineer you should know where to keep the index
// when to keep a index on a single field
// whento keep a index on multiple fields or a compound index
/*
so when i say compound index that means whenever you will query with both this parameters
fromUserId also to toUserId combined this queries will become very fast ok
and we are doing this already i'm trying to find out existing connection request
everytime somebody sent a connection request i'm making this query
so if i'm putting the compound index both the items that this query will be very very fast
even when i million of records in my Database even if i million of documents you know in this collection
still my query wil be very fast this is the important role index in database right
Read More Abouted go read abouted What are different type of indexs
search for index over here mongooose official website and read it.

this connectionRequest collection can grow exponential because see if you have 1000 users
the you can have 1 lakhs requests right so over here it make sence to add this compound index right

as an engineer there is no  rule as such to know that ok 
when should create an indexes it's very subjective and it's opon your 
bravitive or its opon your inteligence that how smartly create indexes
but it's very very important thinks.
altematly the job of index is your query faster but the ways it's implimented
the ways thinks works behind the scence are very difference in sql and very different in mongoDB ok
*/
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
