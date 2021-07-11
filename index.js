const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//routes
app.use(require('./src/routes/index'));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(3000);