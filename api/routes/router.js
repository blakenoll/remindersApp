const express = require("express");
const router = express.Router();
const createReminder = require("./createReminder");
const editReminders = require("./editReminders");
const getReminders = require("./getReminders");
const deleteReminder = require("./deleteReminder");

router.get("/reminders", function(req, res) {
  getReminders(req, res);
});

router.post("/reminders", (req, res) => {
  createReminder(req, res);
});

router.put("/reminders", (req, res) => {
  editReminders(req, res);
});

router.delete("/reminders/:id", (req, res) => {
  deleteReminder(req, res);
});

module.exports = router;
