const { json } = require('express')
const express = require('express')
var allstudent = require('./students.json')
const app = express()

// Static Rendering
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));

// Encoding
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// View Engine
app.set('view engine', 'ejs')

// Express Routing
app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get('/login', (req, res) => {
  res.render("login.ejs")
})


app.listen(3000);