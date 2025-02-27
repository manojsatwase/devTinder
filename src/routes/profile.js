const express = require('express');

const { profile, profileEdit } = require('../controllers/profileController');
const { userAuth } = require('../middlewares/auth');

const profileRouter = express();

profileRouter.route("/profile/view").get(userAuth,profile);
profileRouter.route("/profile/edit").patch(userAuth,profileEdit);

module.exports = profileRouter;