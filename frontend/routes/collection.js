const express = require("express");
const collection = require("../schema/mongo");

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  const { emailId, password } = req.body;

  collection
    .findOne({ emailId: emailId })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const userData = {
            id: user._id,
            emailId: user.emailId,
            phoneNo: user.phoneNo,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
          };

          res.json({
            success: true,
            message: "Login successful",
            user: userData,
          });
        } else {
          res.json({ success: false, message: "Incorrect password" });
        }
      } else {
        res.json({ success: false, message: "User not found" });
      }
    })
    .catch((err) => {
      res.json({ success: false, message: "An error occurred" });
    });
});

authRouter.post("/register", async (req, res) => {
  try {
    const {
      emailId,
      password,
      username,
      role,
      phoneNo,
      name,
      lastName,
      gender,
    } = req.body;

    if (!emailId) {
      return res.status(404).json({ message: "Invalid EmailId" });
    } else if (!password) {
      return res.status(404).json({ message: "Invalid Password" });
    } else if (!username) {
      return res.status(404).json({ message: "Invalid Username" });
    } else if (!role) {
      return res.status(404).json({ message: "Invalid Role" });
    } else if (!phoneNo) {
      return res.status(404).json({ message: "Invalid Phone No" });
    } else if (!name || !lastName) {
      return res.status(404).json({ message: "Invalid Name or Last Name" });
    } else if (!gender) {
      return res.status(404).json({ message: "Invalid Gender" });
    }

    // Check if email is already registered
    const existingEmail = await collection.findOne({ emailId: emailId });
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    // Check if username is already registered
    const existingUsername = await collection.findOne({ username: username });
    if (existingUsername) {
      return res
        .status(409)
        .json({ message: "Username is already registered" });
    }

    // Check if phone number is already registered
    const existingPhoneNo = await collection.findOne({ phoneNo: phoneNo });
    if (existingPhoneNo) {
      return res
        .status(409)
        .json({ message: "Phone number is already registered" });
    }

    collection
      .create(req.body)
      .then((brokers) =>
        res.status(200).json({ brokers, message: "User Registered" })
      )
      .catch((err) =>
        res.status(400).json({ message: "An error occured: ", err })
      );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = authRouter;