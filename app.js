const { json } = require('express')
const express = require('express')
var allstudents = require('./students.json')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const app = express()

// Static Rendering
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));

// Encoding
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// View Engine
app.set('views','./views');
app.set('view engine', 'ejs')

// Express Routing
app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get('/login', (req, res) => {
  res.render("login.ejs")
})

app.post('/login', (req, res)=> {
  
});

app.get("/", function(req, res){
    res.render('dashboard', {name: name});
})


app.listen(3000);