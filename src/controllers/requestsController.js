// if you want to secure this app you need to add userAuth
// if i add this my api is secure this api only be call when my token is valid
// when somebody login
exports.sendConnectionRequest = async (req, res) => {
    const user = req.user;
    // Sending a connection request
    console.log("Sending a connection request");
    res.send(`${user.firstName} Connection Request Sent`);
  };
  