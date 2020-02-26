const client = require("../utils/mongoClient");

module.exports = function createReminders(req, res) {
  client.connect(err => {
    if (err) {
      console.log("err", err);
    }

    const reminders = client.db("reminderApp").collection("reminders");
    // get all reminders for a given user
    reminders
      .find({ userId: req.user.sub })
      .sort({ due: 1 })
      .toArray((err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
      });
  });
};
