const mongoClient = require("../utils/mongoClient");
const AWS = require("aws-sdk");

AWS.config.region = "us-east-1";

module.exports = function createReminders(req, res) {
  const stepfunctions = new AWS.StepFunctions();
  const now = new Date();
  const dueDate = new Date(`${req.body.date}:${req.body.time}`);
  // calculate the total seconds to delay the text
  const timeToDelayText = Math.floor(
    (dueDate.getTime() - now.getTime()) / 1000
  );

  // params to send message
  const params = {
    stateMachineArn:
      "arn:aws:states:us-east-1:484595026606:stateMachine:TaskTimerStateMachine-AeWNZkSsMnGZ",
    input: JSON.stringify({
      topic:
        "arn:aws:sns:us-east-1:484595026606:StepFunctionsSample-TaskTimer42cbff69-506f-41c4-82f1-a6e7929fbbc2-SNSTopic-1M57ZEEB6K47S",
      message: `REMINDER: ${req.body.name}`,
      phone: req.body.phone,
      timer_seconds: timeToDelayText
    })
  };
  // start the step function and create the reminder
  stepfunctions.startExecution(params, function(err, data) {
    if (err) console.log(err, err.stack);

    mongoClient.connect(err => {
      if (err) {
        console.log(err);
      }
      const reminders = mongoClient.db("reminderApp").collection("reminders");
      const reminder = {
        name: req.body.name,
        due: dueDate,
        userId: req.user.sub,
        phone: req.body.phone,
        completed: false,
        executionArn: data.executionArn
      };
      reminders.insertOne(reminder);
      res.send({ status: "added" });
    });
  });
};
