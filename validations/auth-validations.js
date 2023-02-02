//Validaciones con @hapi/joi
const Joi = require('@hapi/joi');

//Validación de formulario de registro
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(15).max(100).required().email(),
    password: Joi.string().min(6).required()
});

//Validación de formulario de login
const schemaLogin = Joi.object({
    email: Joi.string().min(15).max(100).required().email(),
    password: Joi.string().min(6).required()
});

module.exports = { 
    schemaRegister, 
    schemaLogin 
};