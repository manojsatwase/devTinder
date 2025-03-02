const express = require('express');

const { sendConnectionRequest, receiverConnectionRequest } = require('../controllers/requestsController');
const { userAuth } = require('../middlewares/auth');

const requestRouter = express();

requestRouter.route("/request/send/:status/:toUserId").post(userAuth,sendConnectionRequest);
requestRouter.route("/request/review/:status/:requestId").post(userAuth,receiverConnectionRequest)

module.exports = requestRouter;