const express = require("express");
const { chat } = require("../controllers/chatController");
const { userAuth } = require("../middlewares/auth");

const chatRoute = express.Router();

chatRoute.route("/chat/:targetUserId").get(userAuth,chat);


module.exports = chatRoute;