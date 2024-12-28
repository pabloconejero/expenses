const express = require("express")
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json({
        "message": `${process.env.JWT_SECRET}`
    })
})

router.post('/new', (req, res, next) => { 
    
})

module.exports = router