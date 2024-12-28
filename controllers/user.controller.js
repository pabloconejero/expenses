const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await models.User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (validatePassword) {
            res.json({ 'token': jwt.sign({ "id": user.id }, process.env.JWT_SECRET) });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    },
    
    getUser: async (req, res) => {
        const user = await models.User.findOne({ where: { 'id': res.locals.userId }, include: { model: models.Record, as: 'expenses' } });
        res.json({
            "message": user
        });
    },

    register: async (req, res) => {
        await models.User.create(req.body)
            .then(() => {
                res.json({ 'message': 'User registred' });
            })
            .catch(err => {
                res.status(400).json({ 'message': 'Invalid data' });
            })
    },

    updateUser: async (req, res) => {
            await models.User.update(req.body, { where: { 'id': res.locals.userId } })
                .then(() => {
                    res.json({ 'message': 'User updated' });
                })
                .catch(err => {
                    res.status(400).json({ 'message': 'Invalid data' });
                });
    }
}