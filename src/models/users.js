const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  type: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  verification_code: {
    type: String,
    trim: true,
    default: "",
  },
  verification_status: {
    type: Boolean,
    default: false,
  },
});

userSchema.plugin(timestamps);

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// // compare password method for login

userSchema.methods.comparePassword = function (password) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  const userJson = _.pick(userObject, [
    "_id",
    "email",
    "password",
    "type",
    "status",
    "verification_code",
    "verification_status",
    "createdAt",
    "updatedAt",
  ]);
  return userJson;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
