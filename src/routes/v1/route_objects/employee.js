const router = require('express').Router();
const {register_route} = require('../../../utils/reg_routes');
const signup_employee = require('../../../controllers/employee/signup_employee');
const edit_employee = require('../../../controllers/employee/edit_employee');
const delete_employee = require('../../../controllers/employee/delete_employee');
const list_of_employees =require('../../../controllers/employee/list_of_employee')
register_route({
    router,
    route:'/signup_employee',
    auth_enable:false,
    post_method:signup_employee
})
register_route({
    router,
    route:'/edit_employee',
    auth_enable:true,
    put_method:edit_employee
})
register_route({
    router,
    route:'/delete_employee/:id',
    auth_enable:true,
    delete_method:delete_employee
})
register_route({
    router,
    route:'/list_of_employees',
    auth_enable:true,
    get_method:list_of_employees
})

module.exports = router