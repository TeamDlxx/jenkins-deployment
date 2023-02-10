const router = require('express').Router();
const {register_route} = require('../../../utils/reg_routes');
const add_department = require('../../../controllers/department/add_department');
const edit_department = require('../../../controllers/department/edit_department');
const delete_department = require('../../../controllers/department/delete_department');
const list_department = require('../../../controllers/department/list_department');
register_route({
    router,
    route:'/add_department',
    auth_enable:true,
    post_method:add_department
})
register_route({
    router,
    route:'/edit_department/:id',
    auth_enable:true,
    put_method:edit_department
})
register_route({
    router,
    route:'/delete_department/:id',
    auth_enable:true,
    delete_method:delete_department
})
register_route({
    router,
    route:'/list_department',
    auth_enable:true,
    get_method:list_department
})
module.exports = router
