const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const admin_dashboard = require("../../../controllers/init/admin_dashboard");

register_route({
  router,
  route: "/admin_dashboard",
  auth_enable: true,
  admin_auth_enable: true,
  get_method: admin_dashboard,
});

module.exports = router;
