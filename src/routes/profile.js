const express = require('express');

const { profile } = require('../controllers/profileController');
const { userAuth } = require('../middlewares/auth');

const profileRouter = express();

profileRouter.route("/profile").get(userAuth,profile);

module.exports = profileRouter;