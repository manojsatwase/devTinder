const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
exports.pendingConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // suppose if i have to find whatever connection request i have got
    // so i wiil have to write in the query that my toUserId should be the loggedIn UserId
    // and it will get the all connection request
    /*
         suppose if i write like this  
         const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,

        })
        it will also give me the connection request which have been ignore but over there the to Id is me
        do you see that to you see the problem so i have to makhe sure that the status that i'm passing in
        see i'm telling you that whenever you are calling the data from database right this is a database call
        you can get a lot of random think from the database so always make sure what data you are getting in right
        i have to find the pending connection request not all the connection request which i have got right
        otherwise is also give the people who have rejeted you
        some people have interested in your profile 
        some people  have ignore your profile i will also get of the ignore if i don't write the 
        */

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      // from the reference    over here i will pass the list of data need from that right
    }).populate("fromUserId", USER_SAFE_DATA)
    //}).populate("fromUserId",["firstName","lastName"]) // ["firstName","lastName"] this kind of like a filter this is one way of writting it
  
    res.status(200).json({
      message: "data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

exports.connectionsController = async (req, res) => {
  try {
    const loggedInUser = req.user;
  
    // Manoj sends a connection request to Deepika, and Deepika accepts the connection.
    // Deepika sends a connection request to Atul, and Atul accepts the connection.

    // Query for accepted connection requests where the logged-in user is either the sender or the receiver
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" }, // Where user is the receiver
        { fromUserId: loggedInUser._id, status: "accepted" }, // Where user is the sender
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // Check if there are any accepted connection requests
    if (!connectionRequests || connectionRequests.length === 0) {
      return res.status(404).json({
        message: "No accepted connection requests found.",
        data: [],
      });
    }

    // modify the data accordingly
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    // Return the connection requests with the success message and count
    res.status(200).json({
      message: "Data fetched successfully",
      users:data,
      total: data.length,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

exports.feedController = async (req, res) => {
  try {
    // user should see all the cards except
    // 0. his own card
    // 1. his connections
    // 2. ignore people
    // 3. already sent the connectin request

    // Example : suppose Rahul is a new user ,Akshay, Elon, Mark, Donald, MS Dhoni, Virat
    // Rahul = [Akshay, Elon, Mark, Donald, MS Dhoni, Virat];
    // R -> Akshay->Rejected , R->Elon->Accepted => [Mark, Donald, MS Dhoni, Virat]

    const loggedInUser = req.user;
 
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
  
    // Find all connection requests (sent + receiived)
    const connectionRequests = await ConnectionRequest.find({
      // so i will find all the connection request where other i have send or i have received
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        {
          // Hide id is not in this array
          // this  Array.from(hideUsersFromFeed) function convert set into array
          _id: { $nin: Array.from(hideUsersFromFeed) },
          // ne => not equal
        },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({
     users
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
