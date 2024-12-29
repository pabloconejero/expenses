const models = require('../models')

module.exports = {
    getExpenses: async (req, res) => {
        const userId = res.locals.userId
        const expenses = await models.User.findByPk(userId)
            .then(user => {
                return user.getExpenses()
            })

        res.json({ expenses })
    },

    createExpense: async (req, res) => {
        const userId = res.locals.userId
        const user = await models.User.findByPk(userId)
        const expense = await user.createExpense(req.body)
        res.json({ expense })
    },

    deleteExpense: async (req, res) => {
        const userId = res.locals.userId
        const user = await models.User.findByPk(userId)
        const expense = await user.getExpenses({ where: { id: req.params.id } })
        await expense[0].destroy()
        res.json({ message: 'Expense deleted' })
    },

    updateExpense: async (req, res) => {
        const userId = res.locals.userId
        const user = await models.User.findByPk(userId)
        const expense = await user.getExpenses({ where: { id: req.params.id } })
        await expense[0].update(req.body)
        res.json({ message: 'Expense updated' })
    }
}