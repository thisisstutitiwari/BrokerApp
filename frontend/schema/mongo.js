const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/BrokerApp")
  .then(() => {
    console.log("mongo connected");
  })
  .catch(() => {
    console.log(" mongo connectionfailed");
  });

const newSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["owner", "agent", "tenant"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  // All the booked properties
  bookedProperties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
    },
  ],
  waitingBookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties",
    },
  ],
});
const collection = mongoose.model("brokers", newSchema);
module.exports = collection;