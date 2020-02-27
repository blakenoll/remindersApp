const client = require("../utils/mongoClient");
const mongodb = require("mongodb");
const AWS = require("aws-sdk");
const awsConfig = require("../AWSconfig");

// AWS.config.region = "us-east-1";
AWS.config = new AWS.Config(awsConfig);

// find and update document use old documents arn to cancel old request
module.exports = function createReminders(req, res) {
  const stepfunctions = new AWS.StepFunctions();
  const now = new Date();
  const dueDate = new Date(`${req.body.date}:${req.body.time}`);
  // calculate the total seconds to delay the text
  const timeToDelayText = Math.floor(
    (dueDate.getTime() - now.getTime()) / 1000
  );
  client.connect(err => {
    if (err) {
      console.log("err", err);
    }
    console.log(req.body);
    const reminders = client.db("reminderApp").collection("reminders");
    // find the reminder so we can stop the step function
    reminders.findOne(
      { _id: new mongodb.ObjectID(req.body.id) },
      (err, foundReminder) => {
        if (err) console.log(err);
        console.log("found reminder", foundReminder);
        const stopParams = {
          executionArn: foundReminder.executionArn,
          cause: "user updated reminder"
        };
        // stop step function for the given reminder
        stepfunctions.stopExecution(stopParams, err => {
          if (err) console.log(err);

          const startParams = {
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
          // create a new reminder with updated values
          stepfunctions.startExecution(startParams, (err, data) => {
            const updatedReminder = {
              $set: {
                name: req.body.name,
                due: dueDate,
                userId: req.user.sub,
                phone: req.body.phone,
                completed: false,
                executionArn: data.executionArn
              }
            };
            // update reminder in db
            reminders.updateOne(
              { _id: new mongodb.ObjectID(req.body.id) },
              updatedReminder,
              (err, data) => {
                if (err) console.log(err);
                res.send({ status: "updated", reminder: data });
              }
            );
          });
        });
      }
    );
  });
};
