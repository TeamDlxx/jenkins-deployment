const { signupAdmin, detailAdmin } = require("../DAL/admin");
const { signupUser, checking_email_exist } = require("../DAL/user");

// signup admin
const _signup_admin = async (body, resp) => {
  const checkingemailexist = await checking_email_exist(body.email);
  if (checkingemailexist) {
    resp.error = true;
    resp.error_message = "Email already exist";
    return resp;
  }

  // signup new user
  let user = await signupUser(body);
  if (!user) {
    resp.error = true;
    resp.error_message = "Admin sign up failed";
    return resp;
  }
  const admin = await signupAdmin(body, user._id);

  resp.data = {
    admin: admin,
  };

  return resp;
};

const signup_admin = async (body) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _signup_admin(body, resp);
  return resp;
};

// Edit Admin Details
const _edit_admin = async (body, resp, user_id) => {
  const admin = await detailAdmin(user_id);

  if (!admin) {
    resp.error = true;
    resp.error_message = "Admin Not Found";
    return resp;
  }

  admin.first_name = body.first_name;
  admin.last_name = body.last_name;
  admin.contact_number = body.contact_number;
  admin.address = body.address;
  admin.status = body.status;

  let editAdmin = await admin.save();

  if (!editAdmin) {
    resp.error = true;
    resp.error_message = "Admin Update failed";
    return resp;
  }

  resp.data = {
    admin: admin,
  };

  return resp;
};

const edit_admin = async (body, user_id) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _edit_admin(body, resp, user_id);
  return resp;
};

// Getting Admin Details
const _detail_admin = async (user_id, resp) => {
  // if(!user_id) {
  //     resp.error = true;
  //     resp.error_message = "ID required";
  //     return resp;
  // }

  const admin = await detailAdmin(user_id);

  if (!admin) {
    resp.error = true;
    resp.error_message = "Admin Not Found";
    return resp;
  }

  resp.data = {
    admin: admin,
  };

  return resp;
};

const detail_admin = async (user_id) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _detail_admin(user_id, resp);
  return resp;
};

module.exports = {
  signup_admin,
  edit_admin,
  detail_admin,
};
