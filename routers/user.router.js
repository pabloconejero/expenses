const express = require("express")
const router = express.Router()
const userController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.put('/', verifyToken, userController.updateUser)
router.get('/', verifyToken, userController.getUser)

module.exports = router