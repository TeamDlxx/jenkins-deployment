const bcrypt = require("bcrypt");
const { User } = require("../../src/models/users");

//checking user Existance
<<<<<<< HEAD
const find_user = async (body,user_id) => {
  return await User.findOne({email: body.email , _id:{$ne:user_id}});
=======
const find_user = async (body) => {
  return await User.findOne({ email: body.email });
>>>>>>> 7242729eafb334c5d862c1a9c6e6d046ff777302
};

// Get User By Id
const find_user_by_id = async (user_id) => {
  return await User.findOne({ _id: user_id });
};
const delete_user_by_id = async (user_id) => {
  return await User.findByIdAndDelete({ _id: user_id });
};
//craeting admin
const signup_user = async (body) => {
  let user = new User({
    email: body.email,
    password: body.password,
    type: body.type,
    status: body.status,
  });

  user = await user.save();
  return user;
};

//checking duplication of email
const checking_email_exist = async (email) => {
  return await User.findOne({ email: email });
};

// checking is he can create user
const is_user_authorized = async (userId) => {
  return await User.findOne({ _id: userId, type: 0 });
};

module.exports = {
  signup_user,
  checking_email_exist,
  find_user,
  is_user_authorized,
  find_user_by_id,
  delete_user_by_id,
};
