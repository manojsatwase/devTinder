const validator = require('validator');

const validateSignUpData = (req) => {
 /*
    so i'm just trying to make are API very very very safe 
    ans i'm just Sanitizating and validating my data before doning anything
    ok so this how you do it.
*/
  const { firstName, lastName, emailId, password } = req.body;

  if(!firstName || !lastName){
    throw new Error("Name is not valid!")
  }else if(firstName.length < 3 || firstName.length > 50){
    throw new Error("FirstName should be 3-50 characters")
  }else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid!")
  }
  else if(!validator.isStrongPassword(password)){
   throw new Error("Please enter a strong Password!")
  }
};

module.exports = {
 validateSignUpData
}

