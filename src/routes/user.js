const express = require("express");

const { userAuth } = require("../middlewares/auth");
const { pendingConnectionRequest } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/user/requests/received").get(userAuth, pendingConnectionRequest);

module.exports = userRouter;
