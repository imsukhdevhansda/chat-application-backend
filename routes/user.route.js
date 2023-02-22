const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const userRouter = express.Router();

userRouter.get("/all", async (req, res) => {
  const allUser = await UserModel.find();
  res.send({ res: allUser });
});

module.exports = { userRouter };
