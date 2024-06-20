const express = require("express");
const propertySchemaModel = require("../schema/PropertySchema");
const collection = require("../schema/mongo");

const propertyRouter = express.Router();

propertyRouter.post("/postproperty", async (req, res) => {
  propertySchemaModel
    .create(req.body)
    .then((properties) => res.json(properties))
    .catch((err) => res.json(err));
});

propertyRouter.get("/getproperties", (req, res) => {
  propertySchemaModel
    .find({})
    .then(function (properties) {
      res.json(properties);
    })
    .catch(function (err) {
      res.json(err);
    });
});

propertyRouter.get("/getpropertiesbyowner/:userId", (req, res) => {
  const userId = req.params.userId;
  propertySchemaModel
    .find({ userId })
    .then(function (properties) {
      res.json(properties);
    })
    .catch(function (err) {
      res.json(err);
    });
});

propertyRouter.get("/getpropertiesbyagent/:agentId", async (req, res) => {
  const agentId = req.params.agentId;

  try {
    const properties = await propertySchemaModel.find({
      assignedAgent: agentId,
    });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Assigning agent to property for user
propertyRouter.post(
  "/assignagent/:propertyId/:userId/:agentId",
  async (req, res) => {
    const propertyId = req.params.propertyId;
    const userId = req.params.userId;
    const agentId = req.params.agentId;

    try {
      const property = await propertySchemaModel.findById(propertyId);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      } else if (property.status !== "open") {
        return res.status(409).json({ message: "Property is not available" });
      }

      property.status = "waiting";

      // Update the property's assignedAgent field with the provided agent's ID
      property.assignedAgent = agentId;

      // Add the userId to the waitingUser of the property
      property.waitingUser = userId;

      // Save the updated property
      await property.save();

      // Update the user's waitingBookings
      const user = await collection.findByIdAndUpdate(
        userId,
        { $push: { waitingBookings: propertyId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: " Agent assigned successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Approve booking for a property
propertyRouter.post(
  "/approvebooking/:propertyId/:agentId",
  async (req, res) => {
    const propertyId = req.params.propertyId;
    const agentId = req.params.agentId;

    try {
      const property = await propertySchemaModel.findById(propertyId);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      } else if (property.status !== "waiting") {
        return res
          .status(409)
          .json({ message: "Property is not in waiting status" });
      }

      // Check if the agent is assigned to the property
      if (property.assignedAgent.toString() !== agentId) {
        return res
          .status(403)
          .json({ message: "Agent is not assigned to the property" });
      }

      // Get the tenant's ID from waitingUser
      const userIdOfWaitingUser = property.waitingUser;

      // Update the property's status to closed
      property.status = "closed";

      // Assign the tenant to bookedUsers
      property.bookedUsers.push(userIdOfWaitingUser);

      // Clear waitingUser
      property.waitingUser = null;

      // Save the updated property
      await property.save();

      // Update the tenant's waitingBookings and bookedProperties
      const user = await collection.findByIdAndUpdate(
        userIdOfWaitingUser,
        {
          $pull: { waitingBookings: propertyId },
          $push: { bookedProperties: propertyId },
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Tenant not found" });
      }

      res.json({ message: "Booking approved successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Decline booking for a property
propertyRouter.post(
  "/declinebooking/:propertyId/:agentId",
  async (req, res) => {
    const propertyId = req.params.propertyId;
    const agentId = req.params.agentId;

    try {
      const property = await propertySchemaModel.findById(propertyId);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      } else if (property.status !== "waiting") {
        return res
          .status(409)
          .json({ message: "Property is not in waiting status" });
      }

      // Check if the agent is assigned to the property
      if (property.assignedAgent.toString() !== agentId) {
        return res
          .status(403)
          .json({ message: "Agent is not assigned to the property" });
      }

      // Get the tenant's ID from waitingUser
      const userIdOfWaitingUser = property.waitingUser;

      // Clear waitingUser, assignedAgent, and waitingBookings
      property.status = "open";
      property.waitingUser = null;
      property.assignedAgent = null;

      // Update the tenant's waitingBookings and bookedProperties
      const user = await collection.findByIdAndUpdate(
        userIdOfWaitingUser,
        {
          $pull: { waitingBookings: propertyId },
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Tenant not found" });
      }

      // Save the updated property
      await property.save();

      res.json({ message: "Booking declined successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Fetch all booked properties by user
propertyRouter.get("/getbookedproperties/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by userId
    const user = await collection.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has booked properties
    if (!user.bookedProperties || user.bookedProperties.length === 0) {
      return res.status(200).json({ message: "User has no booked properties" });
    }

    // Find all the properties with IDs in the bookedProperties array
    const bookedProperties = await propertySchemaModel.find({
      _id: { $in: user.bookedProperties },
    });

    const currentDate = new Date();

    // Loop through the bookedProperties and update rentStatus
    for (const property of bookedProperties) {
      const dueDate = property.dueDate ? new Date(property.dueDate) : null;

      if (!dueDate || dueDate <= currentDate) {
        // Update rentStatus to "unpaid"
        property.rentStatus = "unpaid";

        // Save the updated property to the database
        await property.save();
      }
    }

    res.json({ bookedProperties });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rent payment route
propertyRouter.post("/payrent", async (req, res) => {
  const { propertyId, userId } = req.body;

  try {
    // Find the property by propertyId
    const property = await propertySchemaModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check if userId matches the one in bookedUsers
    if (
      property.bookedUsers.length === 1 &&
      property.bookedUsers[0] === userId
    ) {
      const currentDate = new Date();
      const dueDate = property.dueDate ? new Date(property.dueDate) : null;

      if (!dueDate || dueDate <= currentDate) {
        // Update rentStatus to "paid" and set dueDate to the first day of the next month
        property.rentStatus = "paid";

        // Calculate due date (same date of next month)
        const currentDate = new Date();
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);
        const year = nextMonth.getFullYear();
        const month = (nextMonth.getMonth() + 1).toString().padStart(2, "0");
        const day = nextMonth.getDate().toString().padStart(2, "0");
        const time = "00:00:00.000";
        const utcOffset = "+00:00";

        const formattedDate = `${year}-${month}-${day}T${time}${utcOffset}`;

        property.dueDate = formattedDate;

        // Save the updated property
        await property.save();

        return res.json({ message: "Rent Paid successfully" });
      } else {
        property.rentStatus = "paid";
        await property.save();
        return res.json({ message: "Rent Already Paid" });
      }
    } else {
      return res.status(403).json({ message: "Unauthorized user" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = propertyRouter;