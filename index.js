const express = require('express');
<<<<<<< Updated upstream
const routes= require('./router');
=======
const routes = require('./router');
const flash = require('connect-flash');
const session = require('express-session');
//<<<<<<< HEAD
>>>>>>> Stashed changes

// Conexion a la base de datos
const db = require('./config/db.js');
      db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error)); 

// crear el servidor
const app = express();

<<<<<<< Updated upstream
=======
app.use(flash());

app.use(session({
  secret: 'tu_secreto',
  resave: true,
  saveUninitialized: true
}));

// Configuracion y Modelos BD
const db = require('./config/db.js');
      require('./Models/Casos.js');
      require('./Models/Usuario.js');
      db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error)); 

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));      
>>>>>>> Stashed changes
// Rutas de la app
app.use('/', routes());

//Puerto
app.listen(5000);