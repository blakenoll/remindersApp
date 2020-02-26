const express = require("express");
const cors = require("cors");
const path = require("path");
const authMiddleware = require("./middleware/checkAuthMiddleware");
const appRouter = require("./routes/router");

const app = express();

const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// serve the built react app from the build folder
app.use(express.static(path.join(__dirname, "../build")));

// use middle ware to verify jwt token
const cognitoMiddleware = authMiddleware.getVerifyMiddleware();

app.use("/api", cognitoMiddleware, appRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
