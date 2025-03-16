const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const intializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // Handle events
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(`${firstName} Joined Room : ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          // Save this message to the database
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(`${firstName} ${text}`);
          let chat = await Chat.findOne({
            participants: {
              $all: [userId, targetUserId],
            },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          const connectionRequest = await ConnectionRequest.findOne({
            $or: [
              {
                fromUserId: userId,
                toUserId: targetUserId,
                status: "accepted",
              },
              {
                toUserId: userId,
                fromUserId: targetUserId,
                status: "accepted",
              },
            ],
          });
       
          if (connectionRequest) {
            console.log("The users are friends.");
            // You can return true here or continue with the logic.
            chat.messages.push({
              senderId: userId,
              text,
            });
  
            await chat.save();
  
            // sending the message back to user
            // whenever you find emit thet means server is seding the message
            io.to(roomId).emit("messageReceived", { firstName, lastName, text });
          } else {
            console.log("The users are not friends.");
            // Handle the case when users are not friends
            return res.status(404).json({
              message: "Users are not friends"
            }) 
          }
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = intializeSocket;
