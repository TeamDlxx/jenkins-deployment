const router = require("express").Router();
const {register_route} = require('../../../utils/reg_routes');
const login  = require('../../../controllers/login'); 

register_route({
    router,
    route: '/',
    auth_enable: false,
    post_method: login
});
 
module.exports = router;
