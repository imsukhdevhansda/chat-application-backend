const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { loginRouter } = require("./routes/login.route");
const { signupRouter } = require("./routes/signup.route");
const { userRouter } = require("./routes/user.route");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  // console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("join", (name) => {
    console.log(`⚡: ${name} user just connected!`);
    socketIO.emit("join", name);
  });

  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the cheat app server");
});

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);

http.listen(PORT, async () => {
  try {
    await connection;
    // console.log(connection);
    console.log("Connecting to DB successfully");
  } catch (err) {
    console.log(err);
    console.log("Error while connecting to DB");
  }
  console.log(`listening on port ${PORT}`);
});

// http.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
