const razorpayInstance = require("../utils/razorpay");
const paymentOrders = require("../models/paymentOrders");
const User = require("../models/user");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

exports.PaymentCreateController = async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    // create order from razorpay
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType,
      },
    });

    // Save it in my database
    const { id, status, amount, currency, receipt, notes } = order;

    const paymentOrder = new paymentOrders({
      userId: req.user._id,
      orderId: id,
      status,
      amount,
      currency,
      receipt,
      notes,
    });

    const savePaymentOrder = await paymentOrder.save();

    // Return back my order details to frontend
    res.status(201).json({
      ...savePaymentOrder.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.paymentVerification = async (req, res) => {
  try {
    console.log("Webhook Called");
    const webhookSignature = req.get("X-Razorpay-Signature");
    console.log("Webhook Signature", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      console.log("INvalid Webhook Signature");
      return res.status(400).json({
        message: "Webhook signiture is invalid",
      });
    }
    console.log("Valid Webhook Signature");

    // Update my payment Status in DB
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await paymentOrders.findOne({
      orderId: paymentDetails.order_id,
    });

    payment.status = paymentDetails.status;
    await payment.save();
    console.log("Payment saved");

    const user = await User.find({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;

    await user.save();
    console.log("User saved");

    // Update the user as premium

    // return success response to razorpay

    // if (req.body.event == "payment.captured") {
    // }
    // if (req.body.event == "payment.failed") {
    // }

    return res.status(200).json({
      message: "Webhook received successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.premiumUserVerify = async (req, res) => {
  try {
    const user = req.user.toJSON();
    if (user.isPremium) {
      return res.json({
        isPremium: true,
      });
    }
    return res.json({ isPremium: false });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
