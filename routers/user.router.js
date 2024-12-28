const express = require("express")
const router = express.Router()
var models = require('../models'); // loads index.js
var User = models.User; 
var Record = models.Record;
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    const validatePassword = await bcrypt.compare(password, user.password)

    if(validatePassword) {
        res.json({'token': jwt.sign({"id": user.id}, process.env.JWT_SECRET)})
    }
    
    return res.status(401).json({message: 'Invalid email or password'})
 })

router.get('/', (req, res, next) => {
    jwt.verify(req.headers.authorization.replace('Bearer ',''), process.env.JWT_SECRET, async (err, decoded) => {
        if(err) {
            return res.status(401).json({message: 'Invalid token'})
        }
        const user = await User.findOne({where: {'id': decoded.id}, include: Record})
        
        res.json({
            "message": user
        })
    })
})
module.exports = router