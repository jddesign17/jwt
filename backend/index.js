const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("./model/user");

require("dotenv").config();

mongoose
  .connect("mongodb://localhost:27017/checkingauth")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

const authurization = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.send("token not found");
  }

  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      return res.send("invaild expried token");
    }
    req.userId = decoded.user;
    next();
  });
};

app.get("/", authurization, async (req, res) => {
  console.log(req.userId);
  try {
    res.send(`App user data${req.userId}`);
  } catch (error) {
    res.send(error);
    console.log(error.name);
  }
});

app.post("/create", async (req, res) => {
  const { name, password } = req.body;

  try {
    const response = await userModel.create({
      name: name,
      password: password,
    });

    await response.save();
    const token = await jwt.sign({ user: response._id }, process.env.KEY);
    res.send(token);
  } catch (error) {}
});

app.post("/user", async (req, res) => {
  const { name, password } = req.body;

  try {
    const response = await userModel.findOne({ name: name });

    if (response.password === password) {
      return res.send("user found");
    } else {
      return res.send("user not found");
    }
  } catch (error) {}
});

app.listen(3000, () => {
  console.log("Server is Running");
});
