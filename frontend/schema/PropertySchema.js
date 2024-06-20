const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/BrokerApp")
  .then(() => {
    console.log("mongo connected");
  })
  .catch(() => {
    console.log(" mongo connectionfailed");
  });

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userId: {
    type: String,
  },
  rent: {
    type: Number,
  },
  bhk: {
    type: Number,
  },
  price: {
    type: Number,
  },
  phoneNo: {
    type: Number,
  },
  propertyDetails: {
    type: String,
  },
  photourl: {
    type: String,
  },
  status: {
    type: String,
    default: "open",
    enum: ["open", "waiting", "closed"],
  },
  bookedUsers: [
    {
      type: String,
    },
  ],
  waitingUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brokers",
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brokers",
  },
  rentStatus: {
    type: String,
    default: "unpaid",
    enum: ["unpaid", "paid"],
  },
  dueDate: {
    type: Date,
  },
});

const propertySchemaModel = mongoose.model("properties", propertySchema);
module.exports = propertySchemaModel;