const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("./routes/collection");
const propertyRouter = require("./routes/propertyRoute");
const userRouter = require("./routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRouter);

app.use("/property", propertyRouter);

app.use("/users", userRouter);

app.listen(8000, () => {
  console.log("Server connected on port 8000");
});