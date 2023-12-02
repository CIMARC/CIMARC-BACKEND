const express = require('express');
const router = express.Router();

const CasosController = require('../Controllers/CasosController.js');
const DocClienteController = require('../Controllers/DocClienteController.js');
const PagosController = require('../Controllers/PagosController.js');
const UsuarioController = require('../Controllers/UsuarioController.js');
const NoticiasController = require('../Controllers/NoticiasController.js');
const EventosController=require('../Controllers/EventosController.js')
const BlogsController=require('../Controllers/BlogsController.js')
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
module.exports = function () {


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
    





    /** DOCUMENTO CLIENTE  */

    //agregar 
    router.post('/subir-documentos', 
    DocClienteController.agregardoccliente
    );

    // Eliminar Casos
    router.delete('/trabajador-casos/:idCasos',
    
        CasosController.eliminarCasos
    )
<<<<<<< Updated upstream
<<<<<<< Updated upstream
//>>>>>>> main
        
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes

        


    router.get('/',(req,res) =>{
        res.send('inicio');
    });


     //Eventos//
=======

    //Eventos//
>>>>>>> Stashed changes

    //Metodo par Mostrar Eventos
    router.get('/mostrar-eventos',
    EventosController.mostrarEventos
    );

    //Agregar Eventos
    router.post('/eventos',
    EventosController.subirArchivoEvento,
    EventosController.nuevoEvento
    )
    // Mostrar Eventos por ID
    router.get('/eventos/:idEventos',
    EventosController.mostrarEventosID
    );

    //Obtener Eventos
    router.get('/eventos',
    EventosController.obtenerEventos
    );


    // Actualizar Eventos
    router.put('/mostrar-eventos/:idEventos',
    EventosController.subirArchivoEvento,
    EventosController.actualizarEventos
    );

    //Mostrar Eventos por Userid
    router.get('/trabajador-eventos/user/:userid',
    
    EventosController.encontrarEventosByUser
    )
    // Mostrar Eventos en especifico
    router.get('/trabajador-eventos/:userid/eventos/:idEventos',
    EventosController.buscarEventosByUser
    );


    //Actualizar Eventos ByUserId and EventosId
    router.put('/trabajador-eventos/:userid/eventos/:idEventos',
        EventosController.subirArchivoEvento,
        EventosController.actualizarEventoIdByUser
    );

    //Eliminar Eventos ByUserId and EventosId
    router.delete('/trabajador-eventos/:userid/eventos/:idEventos',
        EventosController.eliminarEventoIdByUser
    );

    // Actualizar Eventos
    router.put('/trabajador-eventos/:idEventos',
        EventosController.subirArchivoEvento,
        EventosController.actualizarEventos

    )


    // Eliminar Eventos
    router.delete('/eventos/eliminar/:idEventos',
    EventosController.eliminarEventos
    );
    

<<<<<<< Updated upstream

    //Blogs//

    //Agregar Blogs
    router.post('/blogs',
    BlogsController.crearBlogs
    )
    //Obtener Blogs
    router.get('/blogs',
    BlogsController.obtenerBlogs
    );
    // Mostrar Blogs por ID
    router.get('/blogs/:idBlogs',
    BlogsController.mostrarBlogsID
    );
    //Metodo par Mostrar Pagos
    router.get('/mostrar-blogs',
    BlogsController.mostrarBlogs
    );
    
    // Actualizar Blogs
    router.put('/mostrar-blogs/:idBlogs',
    BlogsController.actualizarBlogs,
    
    );
    // Eliminar Blogs
    router.delete('/blogs/eliminar/:idBlogs',
    BlogsController.eliminarBlogs
    );
=======
    //Blogs//

        //Metodo par Mostrar Blog
        router.get('/mostrar-blogs',
        BlogsController.mostrarBlogs
        );
       //Agregar Blog
        router.post('/blogs',
        BlogsController.subirArchivoBlog,
        BlogsController.nuevoBlog
        )
       // Mostrar Blog por ID
        router.get('/blogs/:idBlogs',
        BlogsController.mostrarBlogID
        );
         //Obtener Blog
        router.get('/blogs',
        BlogsController.obtenerBlogs
        );


        // Actualizar Blog
        router.put('/mostrar-blogs/:idBlogs',
        BlogsController.subirArchivoBlog,
        BlogsController.actualizarBlogs
        );
         //Mostrar Blog por Userid
        router.get('/trabajador-blogs/blog/:userid',
        BlogsController.encontrarBlogByUser
        )
        // Mostrar Blog en especifico
        router.get('/trabajador-blogs/:userid/blog/:idBlogs',
        BlogsController.buscarBlogByUser
        );
         //Actualizar Blog ByUserId and BlogsId
        router.put('/trabajador-blogs/:userid/blog/:idBlogs',
        BlogsController.subirArchivoBlog,
        BlogsController.actualizarBlogIdByUser
        );

        //Eliminar Blog ByUserId and BlogsId
        router.delete('/trabajador-blogs/:userid/blog/:idBlogs',
        BlogsController.eliminarBlogIdByUser
        );

        // Actualizar Blog
        router.put('/trabajador-blogs/:idBlogs',
        BlogsController.subirArchivoBlog,
        BlogsController.actualizarBlog

    )

>>>>>>> Stashed changes



    return router;
}