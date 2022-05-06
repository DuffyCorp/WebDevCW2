const express = require("express");
const app = express();
const mustache = require('mustache-express');

require('dotenv').config()
console.log()
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.static('public'));
const router = require('./routes/restaurantRoutes');
const controller = require('./controllers/restaurantController')
const path = require('path');
const public = path.join(__dirname,'public');

app.use(express.urlencoded({extended: false }));

app.use(express.static(public));

app.use(express.urlencoded({extended: false})); 

app.use('/', router); 

//app.listen(process.env.PORT || 3000)

app.listen(3000, () => {
  console.log('Server started on port 3000, press ctrl^c to quit')
})