require('dotenv').config()
const express = require('express')
const port = 3000
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const db = require('./database')
const budgetRouter = require('./routers/budget.router')
const userRouter = require('./routers/user.router')

app.get('/', (req, res, next)=>{
    res.json({'message': 'Hello World!'})
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/budgets', budgetRouter)
app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`app is running in ${port}`)
    db()
})