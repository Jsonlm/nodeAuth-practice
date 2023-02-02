const router = require('express').Router();
const service = require('../services/auth-service');
const validation = require('../validations/auth-validations');

//Api de registro
router.post('/register', async (req, res) => {

    const register = async () => {
        let user = service.getReqBody(req);

        service.saveUser(user, res);     
    };

    const { error } = validation.schemaRegister.validate(req.body) ?? validation.schemaRegister.validate(req.body) ;

    const finalFilter = () => { error ? res.status(400).json({ error: error.details[0].message }) : register(); };

    let findOneEmail = await service.verifyCurrentRegistry(req.body.email);

    findOneEmail ? res.status(400).json({ error: "Email actualmente registrado" }) : finalFilter();
});

module.exports = router;