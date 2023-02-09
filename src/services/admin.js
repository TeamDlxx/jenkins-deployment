<<<<<<< HEAD
const {signup_admin, detail_admin} = require("../DAL/admin");
const {signup_user, checking_email_exist} = require("../DAL/user");
//******************************************************** Admin Signup *****************************************************/
=======
const { signup_admin, detail_admin } = require("../DAL/admin");
const { signup_user, checking_email_exist } = require("../DAL/user");

// signup admin
>>>>>>> 7242729eafb334c5d862c1a9c6e6d046ff777302
const _signupAdmin = async (body, resp) => {
  const checking_email = await checking_email_exist(body.email);
  if (checking_email) {
    resp.error = true;
    resp.error_message = "Email Already Exist";
    return resp;
  }

  // signup new user
  let user = await signup_user(body);
  if (!user) {
    resp.error = true;
    resp.error_message = "User Signup Fail";
    return resp;
  }
  const admin = await signup_admin(body, user._id);
  resp.data = {
    admin: admin,
  };

  return resp;
};
const signupAdmin = async (body) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _signupAdmin(body, resp);
  return resp;
};
//******************************************************** Edit Admin *******************************************************/
const _editAdmin = async (body, resp, user_id) => {
  const admin = await detail_admin(user_id);
  if (!admin) {
    resp.error = true;
    resp.error_message = "Admin Not Found";
    return resp;
  }
  admin.first_name = body.first_name;
  admin.last_name = body.last_name;
  admin.contact_number = body.contact_number;
  admin.address = body.address;
  admin.profile_image = body.profile_image;
  admin.status = body.status;
  let editAdmin = await admin.save();
  if (!editAdmin) {
    resp.error = true;
    resp.error_message = "Admin Update Failed";
    return resp;
  }
  resp.data = {
    admin: admin,
  };
  return resp;
};
const editAdmin = async (body, user_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _editAdmin(body, resp, user_id);
  return resp;
};
//******************************************************** Admin Details ****************************************************/
const _detailAdmin = async (user_id, resp) => {
  const admin = await detail_admin(user_id);
  if (!admin) {
    resp.error = true;
    resp.error_message = "Something Went Wrong Please Try Again";
    return resp;
  }

  resp.data = {
    admin: admin,
  };

  return resp;
};
const detailAdmin = async (user_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _detailAdmin(user_id, resp);
  return resp;
};
/****************************************************************************************************************************/
module.exports = {
  signupAdmin,
  editAdmin,
  detailAdmin,
};
