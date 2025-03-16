const chatModel = require("../models/chat");

exports.chat = async (req, res) => {
  const {  targetUserId } = req.params;
  const userId = req.user._id;

  try {
    let chat = await chatModel.findOne({
      participants: {
        $all: [userId, targetUserId],
      },
    }).populate({
        path: "messages.senderId",
        select: "firstName lastName"
    });

    if (!chat) {
      chat = new chatModel({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    return res.json(chat);
  } catch (err) {
    console.error(err);
  }
};
