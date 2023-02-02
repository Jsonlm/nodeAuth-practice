//import de users model para transacciones
const User = require('../models/users');

const getReqBody = (req) => {
    switch (req.body.name) {
        case !req.body.name:
            //login case
            return user = new User({
                email: req.body.email,
                password: req.body.password
            });
            break;

        default:
            //register case
            return user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            break;
    }
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

const loginUser = async (user, res) => {
    try {
        const savedUser = await user.save();
        res.json({
            message: "Usuario identificado correctamente",
            data: loggedUser
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}

const verifyCurrentRegistry = async (email) => {
    return await User.findOne({ email: email });
}

module.exports = {
    saveUser,
    getReqBody,
    verifyCurrentRegistry
};