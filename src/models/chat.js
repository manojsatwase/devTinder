const mongoose = require("mongoose");

// Message schema with status fields
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    // Track the delivery and seen status for each participant
    /*  status: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            delivered: {
                type: Boolean,
                default: false // Message not delivered by default
            },
            seen: {
                type: Boolean,
                default: false // Message not seen by default
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
    */
  },
  {
    timestamps: true,
  }
);

// Chat schema to hold participants and messages
const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [messageSchema], // Store the messages with status
});

module.exports = mongoose.model("Chat", chatSchema);
