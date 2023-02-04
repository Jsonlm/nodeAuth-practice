const bcrypt = require('bcrypt');
//import de users model para transacciones
const User = require('../models/users');

const getReqBody = async (name, email, password, res) => {
    if (!name) {
        console.log("case1");
        //login case
        user = new User({
            email: email,
            password: password
        });
        loginUser(user, res);
    } else if (name) {
        console.log("case2");
        //register case
        user = new User({
            name: name,
            email: email,
            password: password
        });
        saveUser(user, res);
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

const loginUser = async (user, res, status) => {
    try {
        if (status) {
            res.json({ user: user, data: 'exito bienvenido' })
            console.log("logged");
        } else {
            res.status(400).json({ error: "Usuario o contraseña incorrecta" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

const verifyCurrentRegistry = async (email) => {
    return await User.findOne({ email: email });
}

module.exports = {
    getReqBody,
    hashPassword,
    loginUser,
    saveUser,
    verifyCurrentRegistry
};