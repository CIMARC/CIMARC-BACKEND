const express = require('express');
const router = express.Router();
const CasosController = require('../Controllers/CasosController.js');
const DocClienteController = require('../Controllers/DocClienteController.js');
const PagosController = require('../Controllers/PagosController.js');
const UsuarioController = require('../Controllers/UsuarioController.js');
const NoticiasController = require('../Controllers/NoticiasController.js');

module.exports = function () {



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
//Obtener noticias
    router.get('/noticias',
    NoticiasController.obtenerNoticias)
//Mostrar Noticias
router.get('/noticias/:idNoticias',
NoticiasController.mostrarNoticiasID)
//Actualizar Noticias
router.put('/noticias/:idNoticias',
NoticiasController.actualizarNoticias)
//Eliminar Noticias
router.delete('/noticias/:idNoticias',
NoticiasController.eliminarNoticias)

    //Mostrar Noticias por Userid
    router.get('/noticias/user/:userid',
    
    NoticiasController.encontrarNoticiasByUser
    );

    // Mostrar Noticias en especifico
    router.get('/noticias/:idNoticias/user/:userid',
    
    NoticiasController.buscarNoticiaByIdByUser
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
    router.put('/user-roles/:idUsu',
    
        UsuarioController.actualizarUsuario
    )
    router.delete('/user-roles/:idUsu',
    
        UsuarioController.eliminarUsuario
    )


    /** CASOS */


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
    //Mostrar Casor por Userid
    router.get('/trabajador-casos/user/:userid',
    
        CasosController.encontrarCasosByUser
    );

    // Mostrar Casos en especifico
    router.get('/trabajador-casos/:userid/casos/:idCasos',
    
        CasosController.buscarCasosByUser
    );


    //Actualizar Casos ByUserId and CasoId
    router.put('/trabajador-casos/:userid/casos/:idCasos',
        CasosController.subirArchivo,
        CasosController.actualizarCasoIdByUser
    );

    //Eliminar Casos ByUserId and CasoId
    router.delete('/trabajador-casos/:userid/casos/:idCasos',
        
        CasosController.eliminarCasoIdByUser
    );

    // Actualizar Casos
    router.put('/trabajador-casos/:idCasos',

        CasosController.subirArchivo,
        CasosController.actualizarCaso
    )
    

    /** DOCUMENTO CLIENTE  */

    //agregar 
    router.post('/subir-documentos', 
    DocClienteController.agregardoccliente
    );

    // Eliminar Casos
    router.delete('/trabajador-casos/:idCasos',
    
        CasosController.eliminarCasos
    )

        
    return router;
}