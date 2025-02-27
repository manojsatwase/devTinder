const {validateEditProfileData} = require("../utils/validation");  

exports.profile =  async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
  
  exports.profileEdit = async (req,res) => {
    try {
      // first validate then update the data
     if(!validateEditProfileData(req)){
      // if you do this the error go to into this catch block and send the error back
      throw new Error("Invalid Edit Request");
     }
     
     const loggedInUser = req.user;
     Object.keys(req.body).forEach(key=> loggedInUser[key] = req.body[key]);
     
      await loggedInUser.save();
      res.json({
        message:`${loggedInUser.firstName}, your Profile updated successfully`,
        data:loggedInUser
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }