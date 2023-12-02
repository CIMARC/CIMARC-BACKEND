const express = require('express');
const routes= require('./router');
const flash = require('connect-flash');
const session = require('express-session');
//<<<<<<< HEAD

// Conexion a la base de datos
const db = require('./config/db.js');
      db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error)); 

// crear el servidor
const app = express();

app.use(flash());

app.use(session({
secret: 'tu_secreto',
resave: true,
saveUninitialized: true
}));

// Configuracion y Modelos BD

      require('./Models/Casos.js');
      require('./Models/Usuario.js');
      db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error)); 

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));      

// Rutas de la app
app.use('/', routes());

//Puerto
app.listen(5000);