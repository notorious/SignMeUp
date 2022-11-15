const { json } = require('express')
const express = require('express')
var allstudent = require('./students.json')
const app = express()

app.use('/css',express.static(__dirname + '/src/public/css'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get('/login', (req, res) => {
  res.sendFile("views/login.ejs")
})


app.listen(3000);