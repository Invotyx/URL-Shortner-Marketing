const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object({
    provider: Joi.string().required(),
    social_id: Joi.string().required(),
    email: Joi.string().min(5).max(60).email(),
    password: Joi.string().min(5).max(255),
    phone_number: Joi.string().min(5).max(15),
    first_name: Joi.string().min(5).max(60),
    last_name: Joi.string().min(5).max(60),
  });
  return schema.validate(user);
}

exports.validateUser = validateUser;
