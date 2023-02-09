const Joi = require("joi");
//******************************************************* User Validation for Login *****************************************/
function validate_user(user) {
  const schema = {
    email: Joi.string().required().email({minDomainAtoms: 2}).trim(),
    password: Joi.string().min(5).max(255).required().trim(),
    type: Joi.number().required(),
  };
  return Joi.validate(user, schema);
}
//******************************************************* Password Validation **********************************************/
function validate_password(user) {
  const schema = {
    old_password: Joi.string().min(5).max(255).required().trim(),
    new_password: Joi.string().min(5).max(255).required().trim(),
    confirm_password: Joi.string().min(5).max(255).required().trim(),
  };
  return Joi.validate(user, schema);
}
//******************************************************* Email Validation **************************************************/
function validate_email(body) {
  const schema = {
    email: Joi.string().required().email({minDomainAtoms: 2}).trim(),
  };
  return Joi.validate(body, schema);
}
/******************************************************** Code Verification *************************************************/
function validate_verification_code(body) {
  const schema = {
    email: Joi.string().required().email({minDomainAtoms: 2}).trim(),
    verification_code: Joi.string().required().min(6),
  };
  return Joi.validate(body, schema);
}
/******************************************************** Validate Password ************************************************/
function validate_reset_password(body) {
  const schema = {
    email: Joi.string().required().email({minDomainAtoms: 2}).trim(),
    password: Joi.string().required().min(5),
    confirm_password: Joi.string().required().min(5),
  };
  return Joi.validate(body, schema);
}
/***************************************************************************************************************************/

module.exports = {
  validate_user,
  validate_password,
  validate_email,
  validate_verification_code,
  validate_reset_password,
};
