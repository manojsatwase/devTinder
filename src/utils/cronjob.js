const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");

const connectionRequestModel = require("../models/connectionRequest");

// This Job will run at 8 AM in the morning everyday
cron.schedule("0 8 * * *", async () => {
  // send emails to all people who got requests the previous day
  try {
    const yesterday = subDays(new Date(), 1); // this will give me yesterday date
    const yesterdayStart = startOfDay(yesterday); // this will give me 12 monring 12:00
    const yesterdayEnd = endOfDay(yesterday); // this will give me 11.59 something like that

    const pendingRequests = await connectionRequestModel
      .find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      })
      .populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];


    for (const email of listOfEmails) {
      // Send Emails
      try {
        console.log(
            `New Friend Requests pending for , ${email}  ,
             there so many friend requests pending,
             please login to DevTinder.in and accept and reject the requests.` 
            );
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});


/*
Every Second *
Every Minute *  
Every Hourse *
Every Day *
Every Week *
Every Month *
*/