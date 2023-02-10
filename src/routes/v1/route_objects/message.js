const router = require("express").Router();
const {register_route} = require("../../../utils/reg_routes");
const send_message = require("../../../controllers/message/send_message");
const edit_message = require("../../../controllers/message/edit_message");
const get_messages = require("../../../controllers/message/get_messages");
const delete_message = require("../../../controllers/message/delete_meesage");
const read_message = require("../../../controllers/message/read_message");

register_route({
  router,
  route: "/add_message",
  auth_enable: true,
  post_method: send_message,
});

register_route({
  router,
  route: "/edit_message/:id",
  auth_enable: true,
  put_method: edit_message,
});

register_route({
  router,
  route: "/get_messages",
  auth_enable: true,
  get_method: get_messages,
});

register_route({
  router,
  route: "/delete_message/:id",
  auth_enable: true,
  delete_method: delete_message,
});
register_route({
  router,
  route: "/read_message",
  auth_enable: true,
  post_method: read_message,
});

module.exports = router;
