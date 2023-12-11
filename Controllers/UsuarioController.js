const Usuario = require('../Models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.formIniciarSesion = async (req, res) => {
    const error = req.query.error;
  
    if (error) {
      res.render('iniciar-sesion', {
        isHome: false,
        error: 'Cuenta no verificada'
      });
    } else {
      res.render('iniciar-sesion', {
        isHome: false
      });
    }
  };
  
exports.crearUsuario = async (req, res, next) => {
    const usuarios = new Usuario(req.body);
    try {
        //almacenar un registro
        await usuarios.save();
        res.json({mensaje: 'Se agrego un nuevo usuario'});
    } catch (error) {
        //si hay un error
        res.send(error);
        next();
    }
};
exports.iniciarSesion = async (req, res, next) => {
    const { email, password } = req.body;
  
    // Aquí iría tu código para buscar al usuario en la base de datos utilizando el email
    const usuario = await Usuario.findOne({ where: { email: email } });
  
    if (usuario) {
      if (usuario.activo !== 1) {
        // Redirige al usuario de vuelta a la página de inicio de sesión con un mensaje de error
        res.redirect('/iniciar-sesion?error=Cuenta no verificada');
      } else {
        // Aquí iría tu código para verificar la contraseña y iniciar la sesión del usuario
      }
    } else {
      // Si no se encuentra al usuario, redirige con un mensaje de error
      res.redirect('/iniciar-sesion?error=Usuario no encontrado');
    }
  };

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

// Mostrar Usuario por ID
exports.mostrarUsuarioID = async(req,res,next)=>{
    const usuarios = await Usuario.findByPk(req.params.idUsu);

     if(!usuarios) {
         res.json({mensaje : 'Ese Usuario no existe'});
         return next();
     }

     // Mostrar  el caso
     res.json(usuarios);
 }

 exports.actualizarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findByPk(req.params.idUsu);

        if (!usuario) {
            res.status(404).send('Usuario no encontrado');
            return;
        }

        // Construir un objeto con los campos a actualizar
        const updateObj = {
            email: req.body.email,
        };

        // Verificar si la contraseña se proporciona y cifrarla
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateObj.password = hashedPassword;
        }

        // Actualizar el usuario en la base de datos
        await Usuario.update(updateObj, {
            where: { id: req.params.idUsu }
        });

        // Recuperar el usuario actualizado
        usuario = await Usuario.findByPk(req.params.idUsu);

        res.send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findByPk(req.params.idUsu);
        if (!usuario) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        await Usuario.destroy({
            where: { id: req.params.idUsu }
        });
        res.send({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};

