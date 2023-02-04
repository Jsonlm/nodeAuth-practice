const router = require('express').Router();
const service = require('../services/auth-service');
const validation = require('../validations/auth-validations');
const mdw = require('../middlewares/auth-mdw');

//Api de registro
router.post('/register', async (req, res) => {

    const register = async() => {
        service.hashPassword(req, res);
    };
    const { error } = validation.schemaRegister.validate(req.body);
    const finalFilter = () => { error ? res.status(400).json({ error: error.details[0].message }) : register(); };

    let findOneEmail = await service.verifyCurrentRegistry(req.body.email);

    findOneEmail ? res.status(400).json({ error: "Email actualmente registrado" }) : finalFilter();
});

router.post('/login', async (req, res) => {
    // validaciones
    const { error } = validation.schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    mdw.findUser(req.body, res);
/*     const user = await User.findOne({ email: req.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
 *//* 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
     *//* 
    res.json({
        error: null,
        data: 'exito bienvenido'
    }) */
});

module.exports = router;