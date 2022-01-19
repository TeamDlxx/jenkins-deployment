const {
  find_user,
  find_user_by_id,
  signupUser,
  delete_user_by_id,
} = require("../DAL/user");
const {
  Signup_customer,
  find_customer_by_id,
  pagination_customer,
  all_customer_count,
  delete_customer_by_id,
  get_customer_search,
  customer_search_count,
  find_customer_by_user_id,
} = require("../DAL/customer");
const { add_to_session } = require("../DAL/session");
const jwt = require("jsonwebtoken");
const { UPLOAD_IMAGE } = require("../utils/utils");
const { SERVICE_ICON_SIZE } = require("../utils/constants");
const { v1: uuidv1 } = require("uuid");
const { v1: uuidv4 } = require("uuid");

const _signupCustomer = async (body, resp) => {
  const user = await find_user(body);
  if (user) {
    resp.error = true;
    resp.error_message = "Email Alreay axist";
    return resp;
  }
  body.type = 1;
  body.status = true;
  // signup new user
  let customer_user = await signupUser(body);
  if (!customer_user) {
    resp.error = true;
    resp.error_message = "Something went wrong";
    return resp;
  }
  let customer = {
    _id: customer_user._id,
    email: customer_user.email,
  };
  // add customer
  const customer_obj = {
    user_id: customer,
    first_name: body.first_name,
    last_name: body.last_name,
    profile_image: "",
    contact_number: body.contact_number,
    post_code: body.post_code,
    status: true,
  };
  const final_customer = await Signup_customer(customer_obj);
  //generating token'
  const access = "auth";
  const json_token = uuidv1();
  const token = jwt
    .sign({ login_token: json_token, access }, process.env.JWT_SECRET)
    .toString();
  const add_session = await add_to_session(json_token, customer_user._id);
  if (!add_session) {
    resp.error = true;
    resp.error_message = "Something get wrong";
    return resp;
  }
  customer_obj.token = token;
  resp.data = customer_obj;
  return resp;
};
const signupCustomer = async (body) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _signupCustomer(body, resp);
  return resp;
};

const _editCustomer = async (body, customer_id, user_id,resp) => {
   const user = await find_user_by_id(user_id);
  if (!user) {
    resp.error = true;
    resp.error_message = "Invalid User";
    return resp;
  }
  if (user.type != 0 && user.type != 1) {
    resp.error = true;
    resp.error_message = "You are unauthorized!";
    return resp;
  }
  if (user.type == 1) {
    if (String(user._id) != String(customer_id)) {
      resp.error = true;
      resp.error_message = "You are unauthorized!";
      return resp;
    }
  }
  // find customer by id
  const customer_detail = await find_customer_by_user_id(user_id);
  if (!customer_detail) {
    resp.error = true;
    resp.error_message = "Invalid customer id";
    return resp;
  }
  customer_detail.first_name = body.first_name;
  customer_detail.last_name = body.last_name;
  customer_detail.profile_image = body.profile_image;
  customer_detail.contact_number = body.contact_number;
  customer_detail.post_code = body.post_code;
  await customer_detail.save();
  resp.data = customer_detail;
  return resp;
};
const editCustomer = async (body, customer_id, user_id) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _editCustomer(body, customer_id, user_id, resp);
  return resp;
};


const _getCustomer = async (Limit, page, resp) => {
  ///// pagination
  let limit = parseInt(Limit);
  if (!limit) {
    limit = 15;
  }

  if (page) {
    page = parseInt(page) + 1;
    if (isNaN(page)) {
      page = 1;
    }
  } else {
    page = 1;
  }
  let skip = (page - 1) * limit;
  const customer = await pagination_customer(skip, limit);
  // count all customer
  const total_pages = await all_customer_count();
  const data = {
    customer: customer,
    total_pages: total_pages,
    load_more_url: `/api/customer/get_customers?page=${page}&limit=15`,
  };
  resp.data = data;
  return resp;
};

const getCustomer = async (limit, page) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _getCustomer(limit, page, resp);
  return resp;
};
const _detailCustomer = async (customer_id, user_id, resp) => {
  const user = await find_user_by_id(user_id);
  if (!user) {
    resp.error = true;
    resp.error_message = "Invalid User";
    return resp;
  }
  if (user.type != 0 && user.type != 1) {
    resp.error = true;
    resp.error_message = "You are unauthorized!";
    return resp;
  }
  if (user.type == 1) {
    if (String(user._id) != String(customer_id)) {
      resp.error = true;
      resp.error_message = "You are unauthorized!";
      return resp;
    }
  }
  const customer = await find_customer_by_user_id(customer_id);
  if (!customer) {
    resp.error = true;
    resp.error_message = "Invalid Customer ID!";
    return resp;
  }
  resp.data = customer;
  return resp;
};

const detailCustomer = async (customer_id, user_id) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _detailCustomer(customer_id, user_id, resp);
  return resp;
};

const _deleteCustomer = async (customer_id, resp) => {
  // find by id
  const custmer = await find_customer_by_user_id(customer_id);
  if (!custmer) {
    resp.error = true;
    resp.error_message = "Invalid Customer ID!";
    return resp;
  }
  // customer from user model
  const deleted_user = await delete_user_by_id(custmer.user_id._id);
  // delete customer
  const deleted_customer = await delete_customer_by_id(customer_id);
  return resp;
};

const deleteCustomer = async (customer_id) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _deleteCustomer(customer_id, resp);
  return resp;
};

const _searchCustomer = async (text, Limit, page, resp) => {
  let limit = parseInt(Limit);
  if (!limit) {
    limit = 15;
  }

  if (page) {
    page = parseInt(page) + 1;
    if (isNaN(page)) {
      page = 1;
    }
  } else {
    page = 1;
  }
  let skip = (page - 1) * limit;
  const customer = await get_customer_search(text, skip, limit);
  const total_pages = await customer_search_count(text);
  resp.data = {
    customer,
    total_pages,
  };

  return resp;
};

const searchCustomer = async (text, limit, page) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _searchCustomer(text, limit, page, resp);
  return resp;
};
module.exports = {
  signupCustomer,
  editCustomer,
  getCustomer,
  detailCustomer,
  deleteCustomer,
  searchCustomer,
};
