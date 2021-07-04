const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

//import routes
const userRoute = require("./routes/user");

//BodyParser Middleware
app.use(express.json());

//middleware route
app.use("/user", userRoute);

dotenv.config();

//Database connection
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch(err => console.log(err));

app.listen(4000, () => {
  console.log("Server run on port 4000");
});

module.exports = app;
