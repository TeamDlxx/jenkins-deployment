const router = require("express").Router();
const {register_route} = require("../../../utils/reg_routes");
const signup_new_customer = require("../../../controllers/new_customer/signUp_new_customer");
const edit_new_customer = require("../../../controllers/new_customer/edit_new_customer");
const get_customer_list = require("../../../controllers/new_customer/get_customer_list");
const delete_new_customer = require("../../../controllers/new_customer/delete_new_customer");
register_route({
  router,
  route: "/signup_new_customer",
  auth_enable: false,
  post_method: signup_new_customer,
});

register_route({
  router,
  route: "/edit_new_customer",
  auth_enable: true,
  put_method: edit_new_customer,
});

register_route({
  router,
  route: "/get_customer_list",
  auth_enable: true,
  admin_auth_enable: true,
  get_method: get_customer_list,
});

register_route({
  router,
  route: "/delete_new_customer/:id",
  auth_enable: true,
  get_method: delete_new_customer,
  
});

module.exports = router;
