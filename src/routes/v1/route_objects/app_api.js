const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const login = require("../../../controllers/app_api/login");
const change_password = require("../../../controllers/app_api/change_password");
const change_email = require("../../../controllers/app_api/change_email");
const logout = require("../../../controllers/app_api/logout");
const email_verification = require("../../../controllers/app_api/email_verification");
const code_verification = require("../../../controllers/app_api/code_verification");
const reset_password = require("../../../controllers/app_api/reset_password");
const uplaod_image_s3 = require("../../../controllers/app_api/uplaod_image_s3");
const uplaod_image = require("../../../controllers/app_api/uplaod_image");
const uplaod_audio = require("../../../controllers/app_api/uplaod_audio");
register_route({
  router,
  route: "/login",
  auth_enable: false,
  post_method: login,
});

register_route({
  router,
  route: "/change_password",
  auth_enable: true,
  put_method: change_password,
});

register_route({
  router,
  route: "/change_email",
  auth_enable: true,
  put_method: change_email,
});

register_route({
  router,
  route: "/logout",
  auth_enable: true,
  get_method: logout,
});

register_route({
  router,
  route: "/email_verification",
  auth_enable: false,
  post_method: email_verification,
});

register_route({
  router,
  route: "/code_verification",
  auth_enable: false,
  post_method: code_verification,
});

register_route({
  router,
  route: "/reset_password",
  auth_enable: false,
  post_method: reset_password,
});

register_route({
  router,
  route: "/upload_image_s3",
  auth_enable: true,
  post_method: uplaod_image_s3,
});

register_route({
  router,
  route: "/upload_image",
  auth_enable: true,
  post_method: uplaod_image,
});

register_route({
  router,
  route: "/upload_audio",
  auth_enable: true,
  post_method: uplaod_audio,
});

module.exports = router;
