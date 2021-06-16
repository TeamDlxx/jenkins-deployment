
const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
email: {
type: String,
required: true,
maxlength: 255,
trim: true,
lowercase: true,
},
password: {
type: String,
required: true,
minlength: 5,
maxlength: 255,
trim: true,
},
type: {
type: Number,
default: 0
},
status: {
type: Boolean,
default: true,
},
});

userSchema.plugin(timestamps);

userSchema.methods.toJSON = function () {
const user = this;
const userObject = user.toObject();
const userJson = _.pick(userObject, [
"_id",
"email",
"password",
"type",
"status",
"createdAt",
"updatedAt",
]);
return userJson;
};

const User = mongoose.model("User", userSchema);
module.exports = { User };