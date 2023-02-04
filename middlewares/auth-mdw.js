const User = require('../models/users');
const service = require('../services/auth-service')
const bcrypt = require('bcrypt');

const verifyPassword = async (user, loginFormPassword, res) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(loginFormPassword, saltRounds);

    bcrypt.compare(loginFormPassword, user.password, function (err, result) {
        result ?
            service.loginUser(user, res, result)
        :
            service.loginUser(user, res, result)
        
    });
}

const findUser = async (req, res) => {
    let user = await User.findOne({ email: req.email })

    !user ? res.status(400).json({ error: 'Usuario no encontrado' }) : verifyPassword(user, req.password, res);
}

module.exports = { verifyPassword, findUser };