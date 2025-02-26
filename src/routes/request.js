const express = require('express');
const { sendConnectionRequest } = require('../controllers/requestsController');
const { userAuth } = require('../middlewares/auth');

const requestRouter = express();

requestRouter.route("/sendConnectionRequest").post(userAuth,sendConnectionRequest);

module.exports = requestRouter;