const bcrypt = require('bcrypt');
//import de users model para transacciones
const User = require('../models/users');

const getReqBody = async (name, email, password, res) => {
    switch (name) {
        case !name:
            console.log("case1");
            //login case
            user = new User({
                email: email,
                password: password
            });
            //loginUser(user, res);
            break;
        default:
            console.log("case2");
            //register case
            user = new User({
                name: name,
                email: email,
                password: password
            });
            saveUser(user, res);
            break;
    }
}

const hashPassword = (req, res) => {
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            getReqBody(req.body.name, req.body.email, hash, res);
        });
    });
}

const saveUser = async (user, res) => {
    try {
        const savedUser = await user.save();
        res.json({
            message: "Usuario registrado correctamente",
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}

/* const loginUser = async (user, res) => {
    try {
    } catch (error) {
        res.status(400).json({ error })
    }
} */

const verifyCurrentRegistry = async (email) => {
    return await User.findOne({ email: email });
}

module.exports = {
    saveUser,
    getReqBody,
    hashPassword,
    verifyCurrentRegistry
};