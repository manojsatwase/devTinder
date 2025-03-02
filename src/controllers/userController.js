const ConnectionRequest = require("../models/connectionRequest");

// Get all the pending connection request for the loggedIn user
exports.pendingConnectionRequest = async (req,res) => {
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
            status: "interested"
                 // from the reference    over here i will pass the list of data need from that right 
        }).populate("fromUserId","firstName lastName photoUrl age gender about skills");
        //}).populate("fromUserId",["firstName","lastName"]) // ["firstName","lastName"] this kind of like a filter this is one way of writting it
        
        
        res.status(200).json({
            message: "data fetched successfully",
            data: connectionRequest
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
} 