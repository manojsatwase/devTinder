// if you want to secure this app you need to add userAuth
// if i add this my api is secure this api only be call when my token is valid

const ConnectionRequest = require("../models/connectionRequest");
const { isValidStatus, isValidUserId } = require("../utils/validation");
const User = require("../models/user");

// when somebody login
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
      return res.status(400).json({ message: 'Invalid user ID(s)' });
    }

    // if (fromUserId.toString() === toUserId) {
    //   return res.status(400).json({ message: 'You cannot send a connection request to yourself.' });
    //  }

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({
        message:"User not found!!!"
      })
    }

     // If there is an existing ConnectionRequest
     // Check if a connection request already exists
     const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
        // This checks if a connection request exists where:
        {
          fromUserId, // fromUserId is the person sending the request.
          toUserId   // toUserId is the person receiving the request.
        },
        // This checks if a connection request exists where:
        {
          fromUserId:toUserId, // fromUserId is the person receiving the request (in this case, toUserId).
          toUserId:fromUserId // toUserId is the person sending the request (in this case, fromUserId).
        }
       ],
       status: { $ne: 'rejected' }  // Don't consider rejected requests
     })

     if(existingConnectionRequest){
      return res.status(400).json({
        message: 'Connection request already sent or exists!!!'
      });
     } 
   
     const connectionRequest = new ConnectionRequest({
      fromUserId, 
      toUserId, 
      status
     });

    const data =  await connectionRequest.save();
    res.json({
      message:`${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data
    })
    } catch (err) {
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate connection request send!!!' });
    }
      res.status(400).send("Error: " + err.message);
    }
 };
  