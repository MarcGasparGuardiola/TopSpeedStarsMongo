const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);



module.exports.createBlogEntry = Joi.object({
  title: Joi.string().max(150).required(),
  text: Joi.string().max(1000).optional(),
});

module.exports.selectBlogEntry = Joi.object({
  id: Joi.objectId().required(),
});

module.exports.updateBlogEntry = Joi.object({
  title: Joi.string().max(150).optional(),
  text: Joi.string().max(1000).optional(),
});