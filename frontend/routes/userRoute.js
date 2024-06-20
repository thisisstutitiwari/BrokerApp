const express = require("express");
const collection = require("../schema/mongo");

const userRouter = express.Router();

userRouter.get("/mydetails", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    res.json({ success: false, message: "User ID is required" });
    return;
  }

  collection.findOne({ _id: userId }).then((user) => {
    if (user) {
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
        message: "User details fetched successfully",
        user: userData,
      });
    } else {
      res.json({
        success: false,
        message: "User not found",
      });
    }
  });
});

userRouter.post("/updateDetails", async (req, res) => {
  // regex checks
  const userRegex = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
  const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const userId = req.query.userId;

  if (!userId) {
    res.status(400).json({ success: false, message: "User ID is required" });
    return;
  }

  // Retrieve user details from the request body
  const { username, name, lastName, emailId, phoneNo } = req.body;

  // Perform server-side validation for all fields
  if (!userRegex.test(username)) {
    res.status(400).json({ success: false, message: "Invalid username" });
    return;
  }

  if (!userRegex.test(name)) {
    res.status(400).json({ success: false, message: "Invalid first name" });
    return;
  }

  if (!userRegex.test(lastName)) {
    res.status(400).json({ success: false, message: "Invalid last name" });
    return;
  }

  if (!emailRegex.test(emailId)) {
    res.status(400).json({ success: false, message: "Invalid email address" });
    return;
  }

  if (!phoneRegex.test(phoneNo)) {
    res.status(400).json({ success: false, message: "Invalid phone number" });
    return;
  }

  // Check if the username is already used by another user
  const usernameExists = await collection.findOne({
    _id: { $ne: userId },
    username: username,
  });

  if (usernameExists) {
    res
      .status(400)
      .json({ success: false, message: "Username is already in use" });
    return;
  }

  // Check if the phone number is already used by another user
  const phoneNoExists = await collection.findOne({
    _id: { $ne: userId },
    phoneNo: phoneNo,
  });

  if (phoneNoExists) {
    res
      .status(400)
      .json({ success: false, message: "Phone number is already in use" });
    return;
  }

  // Check if the email is already used by another user
  const emailExists = await collection.findOne({
    _id: { $ne: userId },
    emailId: emailId,
  });

  if (emailExists) {
    res
      .status(400)
      .json({ success: false, message: "Email is already in use" });
    return;
  }

  // Update user details in the database
  collection
    .updateOne(
      { _id: userId },
      {
        $set: {
          username,
          name,
          lastName,
          emailId,
          phoneNo,
        },
      }
    )
    .then(() => {
      res.json({
        success: true,
        message: "User details updated successfully",
      });
    })
    .catch((error) => {
      console.error("Error updating user details:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
});

// Route to get all users with role "agent"
userRouter.get("/getAgents", (req, res) => {
  collection
    .find({ role: "agent" }, { _id: 1, name: 1, lastName: 1, username: 1 })
    .then((agents) => {
      res.json({
        success: true,
        message: "Agents fetched successfully",
        agents,
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        message: "Failed to fetch agents",
        error: error.message,
      });
    });
});

module.exports = userRouter;