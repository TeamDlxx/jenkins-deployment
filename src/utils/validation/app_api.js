const Joi = require("joi");
function validateUser(user) {
  const schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    password: Joi.string().min(5).max(255).required().trim(),
    type: Joi.number().required(),
  };
  return Joi.validate(user, schema);
}

function validatePassword(user) {
  const schema = {
    old_password: Joi.string().min(5).max(255).required().trim(),
    new_password: Joi.string().min(5).max(255).required().trim(),
    confirm_password: Joi.string().min(5).max(255).required().trim(),
  };
  return Joi.validate(user, schema);
}
function validateEmail(body) {
  const schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
  };
  return Joi.validate(body, schema);
}

function validateCode(body) {
  const schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    verification_code: Joi.string().required().min(6),
  };
  return Joi.validate(body, schema);
}
function validateResetPassword(body) {
  const schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
    password: Joi.string().required().min(5),
    confirm_password: Joi.string().required().min(5),
  };
  return Joi.validate(body, schema);
}

function validateEmail(user) {
  const schema = {
    email: Joi.string().required().email({ minDomainAtoms: 2 }).trim(),
  };
  return Joi.validate(user, schema);
}

function validateLatLong(latlong) {
  const schema = {
    place_id: Joi.string().required().trim(),
    fields: Joi.string().required().trim(),
    key: Joi.string().required(),
  };
  return Joi.validate(latlong, schema);
}
function validateGetAdressLatlong(latlong) {
  const schema = {
    key: Joi.string().required(),
    lat_long: Joi.string().required(),
  };
  return Joi.validate(latlong, schema);
}

module.exports = {
  validateUser,
  validatePassword,
  validateEmail,
  validateCode,
  validateResetPassword,
  validateLatLong,
  validateGetAdressLatlong,
};
