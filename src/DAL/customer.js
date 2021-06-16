const { Customer } = require("../models/customers");

const Signup_customer = async (customer_data) => {
  const new_customer = new Customer(customer_data);
  return await new_customer.save();
};
const find_customer_by_id = async (id) => {
  return await Customer.findOne({ _id: id });
};

const find_customer_by_user_id = async (id) => {
  return await Customer.findOne({ user_id: id });
};

const total_customer = async (id) => {
  return await Customer.find().count();
};

const latest_customer = async (id) => {
  return await Customer.find().sort({ createdAt: -1 }).limit(5);
};

const pagination_customer = async (skip, limit) => {
  return await Customer.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
};
const all_customer_count = async () => {
  return await Customer.find().countDocuments();
};

const delete_customer_by_id = async (customer_id) => {
  return await Customer.findByIdAndDelete(customer_id);
};
const get_customer_search = async (text, skip, limit) => {
  return await Customer.find({
    $or: [
      { first_name: { $regex: new RegExp(text, "i") } },
      { last_name: { $regex: new RegExp(text, "i") } },
      { post_code: { $regex: new RegExp(text, "i") } },
      { contact_number: { $regex: new RegExp(text, "i") } },
    ],
  })
    .skip(skip)
    .limit(limit);
};
const customer_search_count = async (text) => {
  return await Customer.find({
    $or: [
      { first_name: { $regex: new RegExp(text, "i") } },
      { last_name: { $regex: new RegExp(text, "i") } },
      { post_code: { $regex: new RegExp(text, "i") } },
      { contact_number: { $regex: new RegExp(text, "i") } },
    ],
  }).countDocuments();
};

module.exports = {
  Signup_customer,
  find_customer_by_id,
  total_customer,
  latest_customer,
  find_customer_by_user_id,
  pagination_customer,
  all_customer_count,
  delete_customer_by_id,
  get_customer_search,
  customer_search_count,
};
