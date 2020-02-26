const client = require("../utils/mongoClient");
const mongodb = require("mongodb");

module.exports = function deleteReminder(req, res) {
  client.connect(err => {
    if (err) {
      console.log("err", err);
    }
    console.log("id", req.params.id);
    const reminders = client.db("reminderApp").collection("reminders");
    // delete reminder fot the given id
    reminders.deleteOne(
      { _id: new mongodb.ObjectID(req.params.id) },
      (err, result) => {
        if (err) console.log(err);
        res.send({ status: "deleted" });
      }
    );
  });
};
