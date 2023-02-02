const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.log(process.env.MONGODB_URI);
    console.log("error connecting to the database", err);
    process.exit();
  });
module.exports = { mongoose };
