const router = require("express").Router();
const {register_route} = require("../../../utils/reg_routes");
const make_connection = require("../../../controllers/connection/make_connection");
const accept_connection = require("../../../controllers/connection/accept_connection");
const list_chat_users =require('../../../controllers/connection/list_chat_users')

register_route({
  router,
  route: "/make_connection",
  auth_enable: true,
  post_method: make_connection,
});
register_route({
  router,
  route: "/accept_connection",
  auth_enable: true,
  post_method: accept_connection,
});
register_route({
  router,
  route: "/list_chat_users",
  auth_enable: true,
  get_method: list_chat_users,
});

module.exports = router;
