const express = require('express');
const router = express.Router();

module.exports = function () {
<<<<<<< Updated upstream
=======
const NoticiasController = require('../Controllers/NoticiasController.js');

    /** PAGOS */
    //Agregar pagos
    router.post('/pagos',
        PagosController.CrearPagos
    );
    //Obtener pagos
    router.get('/pagos',
        PagosController.obtenerPagos
    );

    //Metodo par Mostrar Pagos
    router.get('/mostrar-pagos',
    PagosController.mostrarPagos
    );

// Actualizar Pagos
router.put('/mostrar-pagos/:idPagos',
    PagosController.actualizarPago,
    PagosController.mostrarPagos

    );
// Mostrar Pagos por ID
router.get('/pagos/:idPagos',
    PagosController.mostrarPagosID
);

// Eliminar Pagos
router.delete('/pagos/eliminar/:idPagos',
    PagosController.eliminarPagos
);


    /**Noticias */
    router.post('/noticias',
        NoticiasController.crearNoticias
    );

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
        
    
>>>>>>> Stashed changes

    router.get('/',(req,res) =>{
        res.send('inicio');
    });

    return router;
}