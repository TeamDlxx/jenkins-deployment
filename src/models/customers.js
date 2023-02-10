const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");

const customerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  phone_no: {
    type: String,
  },
  postal_address: {
    type: String,
  },
  status: {
    type: Boolean,
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
    "phone_no",
    "postal_address",
    "status",
    "user_type",
    "createdAt",
    "updatedAt",
  ]);
  return customerJson;
};

const Customer = mongoose.model("customer", customerSchema);
exports.Customer = Customer;
