const { validateEditProfileData,validateForgetPassword } = require("../utils/validation");

exports.profile = async (req, res) => {
  try {
    const user = req.user;
    res.json({user});
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

exports.profileEdit = async (req, res) => {
  try {
    // first validate then update the data
    if (!validateEditProfileData(req)) {
      // if you do this the error go to into this catch block and send the error back
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your Profile updated successfully`,
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Validate request data (you can add more validation logic here)
    validateForgetPassword(req);

    // Check if the old password is correct
    const isPasswordValid = await req.user.validatePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid old password');
    } 

    // Check if the new password is the same as the old one
    if (oldPassword === newPassword) {
      throw new Error('New password cannot be the same as the old password');
    }

    // Hash the new password before saving (optional if you're hashing passwords)
    const passwordHash = await req.user.getPasswordHash(newPassword);

    // Update the user's password
    req.user.password = passwordHash;
    await req.user.save();
    
    // Respond to the client
    res.json({message:'Password updated successfully!'});
    
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
};
