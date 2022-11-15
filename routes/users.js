const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.send("Users.js file")
})

router.get('/:id', (req, res) => {
    res.send(`Hello user ${req.params.id}`)
})
  

module.exports = router