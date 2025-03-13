const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { PaymentCreateController , paymentVerification, premiumUserVerify} = require("../controllers/PaymentController");
const paymentRouter = express.Router();

paymentRouter.route("/payment/create").post(userAuth,PaymentCreateController);
// this function razorpay call us never ever write userAuth
paymentRouter.route("/payment/webhook").post(paymentVerification);
paymentRouter.route("/premium/verify").get(userAuth,premiumUserVerify);

module.exports = paymentRouter;