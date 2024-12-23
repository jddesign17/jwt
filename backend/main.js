const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const userModel = require("./model/user");

app.use(express.json());
app.use(cors());

const authurization = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.send("token not found");
  }
  jwt.verify(token, "ABCD", (err, decoded) => {
    if (err) {
      return res.send("invaild expried token");
    }
    req.Id = decoded.id;
    next();
  });
};

app.get("/", authurization, async (req, res) => {
  try {
    const user = await userModel.findById(req.Id);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

app.post("/create", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await userModel.create({
      name: name,
      password: password,
    });
    await user.save();

    const token = jwt.sign({ id: user._id, name: user.name }, "ABCD");

    res.send(token);

    res.send(user);
  } catch (error) {}
});

mongoose
  .connect("mongodb://localhost:27017/authprofile")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is Running");
});
