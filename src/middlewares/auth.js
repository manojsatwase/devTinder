const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
  try {
    // the job of this middleware is to Read the token from the req.cookies
    const { token } = req.cookies;
    if(!token){
      // throw new Error("Token is not valid!!!");
      return res.status(401).send("Please Login!");
    }
    // Validate the token
    // Basically i was storing the id over here when i login this is i will get back
    const decodedObj = await jwt.verify(token,"SecreateKey@$143");
    
    const {_id} = decodedObj;
    // Find the user 
    const user = await User.findById(_id);

    if(!user){
      throw new Error("User not found");
    }
    // i can attach the user over here
    // whatever i found data from dababase i just attach into request
    // and i have call the next() function
    req.user = user;
    // call the next function
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};

/*
basically assume that whenever a /admin request will come it will first 
got the middleware it will check if the user is authenticated or not
if the admin is not authenticated from here only we will send the response 
back and this request will never even go over here it will not reach to the handler
and its good right and it's safe are admin route is protected right
if the request is aprove then call the next middleware function
*/
