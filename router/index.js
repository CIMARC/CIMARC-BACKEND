const express = require('express');
const router = express.Router();
const CasosController = require('../Controllers/CasosController.js');
//<<<<<<< HEAD
const DocClienteController = require('../Controllers/DocClienteController.js');
//module.exports = function () {}

    
//=======
const UsuarioController = require('../Controllers/UsuarioController.js');
module.exports = function () {

    /** USUARIO*/
    router.get('/user-roles',

        UsuarioController.obtenerUsuarios
    );
    router.post('/user-roles',

        UsuarioController.crearUsuario
    )
    router.get('/user-roles/:idUsu',
    
        UsuarioController.mostrarUsuarioID
    )
    /** CASOS */
//>>>>>>> main

    //Metodo par Mostrar Casos
    router.get('/trabajador-casos',
    
        CasosController.mostrarCasos
    );

    //Agregar Casos
    router.post('/trabajador-casos',
        
        CasosController.subirArchivo,
        CasosController.nuevoCaso
    );

    //Mostrar Casos por ID
     router.get('/trabajador-casos/:idCasos',
    
         CasosController.mostrarCasosID
    );
    
    // Actualizar Casos
    router.put('/trabajador-casos/:idCasos',

        CasosController.subirArchivo,
        CasosController.actualizarCaso
    )
    
//<<<<<<< HEAD




    /** DOCUMENTO CLIENTE  */

    //agregar 
    router.post('/subir-documentos', 
    DocClienteController.agregardoccliente
    );
//=======
    // Eliminar Casos
    router.delete('/trabajador-casos/:idCasos',
    
        CasosController.eliminarCasos
    )
//>>>>>>> main
        
    


    return router;
}