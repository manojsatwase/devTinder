const express = require('express');

const { profile, profileEdit ,forgetPassword} = require('../controllers/profileController');
const { userAuth } = require('../middlewares/auth');

const profileRouter = express();

profileRouter.route("/profile/view").get(userAuth,profile);
profileRouter.route("/profile/edit").patch(userAuth,profileEdit);
profileRouter.route("/profile/forgetPassword").patch(userAuth,forgetPassword);

module.exports = profileRouter;