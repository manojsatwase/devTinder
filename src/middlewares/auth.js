const adminAuth = (req,res,next) => {

}

module.exports = {
    adminAuth
}

/*
basically assume that whenever a /admin request will come it will first 
got the middleware it will check if the user is authenticated or not
if the admin is not authenticated from here only we will send the response 
back and this request will never even go over here it will not reach to the handler
and its good right and it's safe are admin route is protected right
if the request is aprove then call the next middleware function
*/