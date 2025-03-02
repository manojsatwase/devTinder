const express = require("express");

const { userAuth } = require("../middlewares/auth");
const { pendingConnectionRequest , connectionsController,feedController} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/user/requests/received").get(userAuth, pendingConnectionRequest);
userRouter.route("/user/connections").get(userAuth,connectionsController);
userRouter.route("/feed").get(userAuth,feedController);

module.exports = userRouter;
