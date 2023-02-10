const router = require("express").Router();
const {register_route} = require("../../../utils/reg_routes");
const signup_student = require("../../../controllers/student/signup_student");
const edit_student = require("../../../controllers/student/edit_student");
const get_student = require("../../../controllers/student/get_student");
const delete_student = require("../../../controllers/student/delete_student");
register_route({
  router,
  route: "/signup_student",
  auth_enable: false,
  post_method: signup_student,
});

register_route({
  router,
  route: "/edit_student",
  auth_enable: true,
  put_method: edit_student,
});

register_route({
  router,
  route: "/get_student",
  auth_enable: true,
  get_method: get_student,
});

register_route({
  router,
  route: "/delete_student/:id",
  auth_enable: true,
  delete_method: delete_student,
});

module.exports = router;
