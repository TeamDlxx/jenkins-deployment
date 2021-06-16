const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    trim: true,
  },
  first_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  profile_image: {
    type: String,
    trim: true,
  },
  contact_number: {
    type: String,
    trim: true,
    required: true,
  },
  post_code: {
    type: String,
    trim: true,
    required: true,
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
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

customerSchema.plugin(timestamps);

customerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  const customerJson = _.pick(customerObject, [
    "_id",
    "user_id",
    "first_name",
    "last_name",
    "profile_image",
    "contact_number",
    "post_code",
    "verification_code",
    "verification_status",
    "status",
    "createdAt",
    "updatedAt",
  ]);
  return customerJson;
};

const Customer = mongoose.model("customer", customerSchema);
exports.Customer = Customer;
