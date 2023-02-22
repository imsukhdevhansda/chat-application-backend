const { UserModel } = require("../models/User.model");
const { TodoModel } = require("../models/Todo.model");
var jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.method === "DELETE") {
    next();
  } else {
    const { token } = req.body;
    // console.log("token:", token);

    jwt.verify(token, "webtoken", async function (err, decoded) {
      const userPresent = await UserModel.findOne({ _id: decoded?.userID });
      if (userPresent) {
        // console.log("userPresent:", userPresent._id);
        // const todos = await TodoModel.find({ userID: decoded.userID });
        // next(userPresent._id);
        req.body.userID = userPresent._id;
        next();
      } else {
        res.status(404).send({ res: "Please Login First" });
      }
    });
  }
};
module.exports = { verifyToken };
