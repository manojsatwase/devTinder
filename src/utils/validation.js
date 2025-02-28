const validator = require("validator");
const mongoose = require("mongoose");

const validateSignUpData = (req) => {
  /*
    so i'm just trying to make are API very very very safe 
    ans i'm just Sanitizating and validating my data before doning anything
    ok so this how you do it.
*/
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("FirstName should be 3-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const { emailId, photoUrl, about, skills } = req.body;
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((filed) =>
    allowedEditFields.includes(filed)
  );

  if (!validator.isURL(photoUrl)) {
    throw new Error(`Invalid Photo URL address: ${photoUrl}`);
  }
  if (about?.length > 250) {
    throw new Error("About should not be more than 250 character long");
  }
  if (skills?.length > 10) {
    throw new Error("Skills should not be more than 10");
  }

  return isEditAllowed;
};

const validateForgetPassword = (req) => {
  const { newPassword } = req.body;
  if (!newPassword) {
    throw new Error("Password should not Empty!!!");
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Enter a Strong Password:" + newPassword);
  }
};

const isValidStatus = (status) => {
  const allowedStatus = ["interested","ignored"];
  if(!allowedStatus.includes(status)){
    throw new Error(`${status} Invalid status type`);
  }
}

// Utility function to validate user ID
const isValidUserId = (userId) =>{
  // Basic check if userId is a valid ObjectId
  return mongoose.Types.ObjectId.isValid(userId);
}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateForgetPassword,
  isValidStatus,
  isValidUserId
};
