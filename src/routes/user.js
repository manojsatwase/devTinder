const express = require("express");

const { userAuth } = require("../middlewares/auth");
const { pendingConnectionRequest , connectionsController} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/user/requests/received").get(userAuth, pendingConnectionRequest);
userRouter.route("/user/connections").get(userAuth,connectionsController);

module.exports = userRouter;
