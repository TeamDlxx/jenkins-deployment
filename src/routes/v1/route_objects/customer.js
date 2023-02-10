const router = require("express").Router();
const {register_route} = require("../../../utils/reg_routes");
const signup_customer = require("../../../controllers/customer/signup_customer");
const edit_customer = require("../../../controllers/customer/edit_customer");
const get_customers = require("../../../controllers/customer/get_customer");
const detail_customer = require("../../../controllers/customer/detail_customer");
const delete_customer = require("../../../controllers/customer/delete_customer");
const list_customer = require("../../../controllers/customer/list_customer");
register_route({
  router,
  route: "/signup_customer",
  auth_enable: false,
  post_method: signup_customer,
});

register_route({
  router,
  route: "/edit_customer",
  auth_enable: true,
  put_method: edit_customer,
});

register_route({
  router,
  route: "/get_customers",
  auth_enable: true,
  admin_auth_enable: true,
  get_method: get_customers,
});

register_route({
  router,
  route: "/detail_customer",
  auth_enable: true,
  get_method: detail_customer,
});

register_route({
  router,
  route: "/delete_customer/:id",
  auth_enable: true,
  admin_auth_enable: true,
  delete_method: delete_customer,
});
register_route({
  router,
  route: "/list_customer",
  auth_enable: true,
  admin_auth_enable: true,
  get_method: list_customer,
});

module.exports = router;
