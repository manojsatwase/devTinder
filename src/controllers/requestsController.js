// if you want to secure this app you need to add userAuth
// if i add this my api is secure this api only be call when my token is valid

const ConnectionRequest = require("../models/connectionRequest");
const { isValidStatus, isValidUserId } = require("../utils/validation");
const User = require("../models/user");

// this was from the sender side of think
exports.sendConnectionRequest = async (req, res) => {
  try {
    const status = req.params.status;
    isValidStatus(status);

    // const loggedInUser = req.user this is basically the fromUser
    const fromUserId = req.user._id;
    // how will i get my toUserId
    const toUserId = req.params.toUserId;
    // and where will i get my status from while i'm sending the request interested

    if (!isValidUserId(fromUserId) || !isValidUserId(toUserId)) {
      return res.status(400).json({ message: "Invalid user ID(s)" });
    }

    // if (fromUserId.toString() === toUserId) {
    //   return res.status(400).json({ message: 'You cannot send a connection request to yourself.' });
    //  }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({
        message: "User not found!!!",
      });
    }

    // If there is an existing ConnectionRequest
    // Check if a connection request already exists
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        // This checks if a connection request exists where:
        {
          fromUserId, // fromUserId is the person sending the request.
          toUserId, // toUserId is the person receiving the request.
        },
        // This checks if a connection request exists where:
        {
          fromUserId: toUserId, // fromUserId is the person receiving the request (in this case, toUserId).
          toUserId: fromUserId, // toUserId is the person sending the request (in this case, fromUserId).
        },
      ],
      status: { $ne: "rejected" }, // Don't consider rejected requests
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection request already sent or exists!!!",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });
  } catch (err) {
    // Handle duplicate key error
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate connection request send!!!" });
    }
    res.status(400).send("Error: " + err.message);
  }
};

/*
    now i will write the logic of accept the connection request
    but first of fall lets write that logic in theory ok
    always whenever you are writting the logic for API calls
    make sure you cover all the corner cases make sure before writing
    any code in your head you clear about what you are going to write
    and have you cover all the corner cases or not right
    let us take an example 

    Validate the status

     Manoj => deepika
     loggedInId === toUserId
     status = interested the status should be definatly be interested
     request Id should be valid present into database 

    now once you have plan this api don't just directly start writing code
    because it becomes very tough right because you don't understant what should i write
  */
exports.receiverConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const {status,requestId} = req.params;
    
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Status not allowed!",
      });
    }
  
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId, // sender id who is interested
      toUserId: loggedInUser._id, // from user id is me
      status: "interested",
    });
   console.log()
    if (!connectionRequest) {
      return res.status(404).json({
        message: "Connection request not found",
      });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();
  
    res.json({
      message: `Connection request ${status}`,
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

/*
so see junior intern can and can make the api like this ok
so the status is pass whatever the status is coming status we have added over here 
whatever requestId is coming over here i have just find it and i can do it
But let me tell you this validation are very important to find wether the loggedIn user
is the toUser if the status is interested if the allowed status is accepted or rejected
all this thinks are something which you have to think about
that attacker can missused your APIs security of your API and 
this is the most important thing

  const loggedInUser = req.user;
    const status = req.params.status;
     connectionRequest.status = status;

    const data = await connectionRequest.save();

    and you know every line matter
  
*/



// this review request api for the reciever side
exports.acceptOrRejectRequest = async (req, res) => {
  try {
    const status = req.params?.status;
    // const loggedInUser = req.user this is basically the fromUser
    const fromUserId = req.user?._id;
    // how will i get my requestId
    const requestId = req.params?.requestId;
    // and where will i get my status from while i'm sending the request interested

    // Validate that the action is either 'accepted' or 'rejected'
    if (!["accepted", "rejected"].includes(status)) {
      return res
        .status(400)
        .send("Invalid action. It must be 'accepted' or 'rejected'.");
    }

    const connectionRequest = await ConnectionRequest.findById(fromUserId);

    if (!connectionRequest) {
      return res.status(404).send("Connection request not found.");
    }

    // Check if the logged-in user is the receiver
    if (!connectionRequest.requestId.equals(requestId)) {
      return res
        .status(403)
        .send("You are not the intended receiver of this request.");
    }
    // Update the status of the connection request based on the action
    connectionRequest.status = action;
    // Save the updated request
    await connectionRequest.save();

    // Send the updated connection request details in the response
    return res.status(200).json({
      message: `Connection request ${status} successfully.`,
      connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};
