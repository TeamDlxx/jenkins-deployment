const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/backend-template", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch((err) => {
    console.log("error connecting to the database", err);
    process.exit();
  });
module.exports = {mongoose};
