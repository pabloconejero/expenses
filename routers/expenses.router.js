const express = require("express")
const verifyToken = require("../middlewares/verifyToken")
const expenseController = require("../controllers/expense.controller")
const router = express.Router()


router.get('/', verifyToken, expenseController.getExpenses)
router.post('/', verifyToken, expenseController.createExpense)
router.put('/:id', verifyToken, expenseController.updateExpense)
router.delete('/:id', verifyToken, expenseController.deleteExpense)

module.exports = router