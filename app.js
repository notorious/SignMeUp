const { json } = require('express')
const express = require('express')
const app = express()

app.use(express.static('src/public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('view engine', 'ejs')

const users = [{name: "Name"}]

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', (req, res) => {
  const user = {name: req.body.name, password: req.body.password};
  users.push(user)
  res.status(201).send()
})

app.get('/', (req, res) => {
  res.sendFile("src/public/index.html")
})


app.listen(3000);