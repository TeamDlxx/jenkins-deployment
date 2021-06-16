const router = require("express").Router();
const {register_route} = require('../../../utils/reg_routes');
const signup  = require('../../../controllers/user/signup'); 

register_route({
    router,
    route: '/signup',
    auth_enable: false,
    post_method: signup
});
 
module.exports = router;