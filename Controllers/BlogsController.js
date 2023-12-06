const Blogs = require('../Models/Blogs');
const Usuario = require('../Models/Usuario');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path'); // Importar el módulo path


const configuracionMulter = {
    limits: { fileSize: 100000 },  // límite de tamaño en bytes
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname + '../../uploads/eventos');
        },
        filename: (req, file, next) => {
            const extension = file.originalname.split('.').pop();  // obtener la extensión del archivo original
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, next) => {
        const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (allowedFileTypes.includes(file.mimetype)) {
            // el formato es válido
            next(null, true);
        } else {
            // el formato no es válido
            next(new Error('Formato no válido'), false);
        }
    }
};

const upload = multer(configuracionMulter).single('documentos');  // Cambiado a 'documentos' en lugar de 'imagen'

// sube archivo en el servidor
exports.subirImagenes = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El Archivo es muy grande');
                } else {
                    req.flash('error', error.message);
                }
            } else if (error.hasOwnProperty('message')) {
                req.flash('error', error.message);
            }
            res.redirect('back');
            return;
            // TODO: Manejar errores
        } else {
            next();
        }
    });
};
// Agregar Blogs
exports.crearBlog = async (req, res, next) => {
    const blogs = new Blogs(req.body);
    try {
        // Verificar si se ha subido un documento
        if( req.file && req.file.filename){
//<<<<<<< Updated upstream
            blog.documentos = req.file.filename;
//=======
            blogs.imagen = req.file.filename;
//>>>>>>> Stashed changes
        }
        //almacenar un registro
        await blogs.save();
        res.json({mensaje: 'Se agrego un nuevo Blogs'});
    } catch (error) {
        //si hay un error
        res.send(error);
        next();
    }
};
// Mostrar Eventos
exports.mostrarBlog = async(req,res,next) =>{
    
    try {
        // obtener todos los casos
        const blog = await Blogs.findAll({});
        res.json(blog);
    } catch (error) {
        console.log(error);
        next();
    }
};

    // Mostrar Evento por ID
exports.mostrarBlogID = async (req, res, next) => {
    try {
        const blog = await Blogs.findByPk(req.params.idBlogs);
    
        if (!blog) {
            res.json({ mensaje: 'El blog no existe' });
            return next();
        }
    
        // Mostrar el Evento
        res.json(blog);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

 // Actualizar un Eventos via id 
exports.actualizarBlog = async (req, res, next) => {
    try {
        // Construir un nuevo caso
        let nuevoBlog = req.body;

        // Verificar si hay un archivo nuevo
        if (req.file && req.file.filename) {
            nuevoBlog.documentos = req.file.filename;

            // Obtener el caso anterior para borrar el archivo antiguo
            let blognterior = await Eventos.findByPk(req.params.idBlogs);
            if ( blognterior .documentos) {
                // Construir la ruta completa al archivo antiguo
                const rutaArchivoAntiguo = path.join(__dirname, `../uploads/blog/${blognterior.documentos}`);

                // Borrar el archivo antiguo
                await fs.unlink(rutaArchivoAntiguo);
            }
        } else {
            // Obtener el caso anterior para mantener el nombre del documento
            let blognterior = await Blogs.findByPk(req.params.idBlogs);
            nuevoBlog.documentos = blognterior.documentos;
        }

        // Actualizar el caso en la base de datos y obtener el número de filas afectadas
        const [numFilasActualizadas] = await Blogs.update(nuevoBlog, {
            where: { id: req.params.idBlogs },
        });

        // Verificar si se actualizó con éxito
        if (numFilasActualizadas > 0) {
            // Obtener el caso actualizado después de la actualización
            const blogActualizado = await Blogs.findByPk(req.params.idBlogs);

            // Enviar la respuesta JSON con el caso actualizado
            res.json(blogActualizado);
        } else {
            // Si numFilasActualizadas es 0, significa que el caso no fue encontrado o no se actualizó correctamente
            console.log('No se actualizaron filas.');
            return res.status(404).json({ mensaje: 'Blog no encontrado' });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.encontrarBlogByUser = async (req, res, next) => {
    try {
        const Userid  = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            next();
        }
        const blog = await Blogs.findAll({
            where: { userid: req.params.userid },
        });
        res.json(blog);
    } catch (error) {
        console.log(error);
        next(error);
    }
}
//mostrar casos por userid y casosid
exports.buscarBlogByUser = async (req,res,next) =>{
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Blog  no encontrado' });
        }
        // Verificar si el caso existe para este usuario
        const blog = await Blogs.findOne({
            where: {
                id: req.params.idBlogs,
                userid: req.params.userid,
            },
        });
        if (!blog) {
            return res.status(404).json({ mensaje: 'Blog  no encontrado para este usuario' });
        }
        
        res.json(blog);

    } catch (error) {
        console.error(error);
        next(error);
    }
}
//actualizar casos por userid y casosid
exports.actualizarBlogIdByUser = async (req, res, next) => {
    try {
        const Userid = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const blog = await Blogs.findOne({
            where: {
                id: req.params.idBlogs, // Suponiendo que tienes un parámetro para identificar el caso
                userid: req.params.userid,
            },
        });

        if (!blog) {
            return res.status(404).json({ mensaje: 'Blog no encontrado para este usuario' });
        }
    // Construir un nuevo caso
    let nuevoBlog = req.body;

    // Verificar si hay un archivo nuevo
    if (req.file && req.file.filename) {
        nuevoBlog.documentos = req.file.filename;

        // Obtener el caso anterior para borrar el archivo antiguo
        let blogAnterior = await Blogs.findByPk(req.params.idEventos);
        if (blogAnterior.documentos) {
            // Construir la ruta completa al archivo antiguo
            const rutaArchivoAntiguo = path.join(__dirname, `../uploads/blog/${blogAnterior.documentos}`);

            // Borrar el archivo antiguo
            await fs.unlink(rutaArchivoAntiguo);
        }
    } else {
        // Obtener el caso anterior para mantener el nombre del documento
        let blogAnterior = await Blogs.findByPk(req.params.idBlogs);
        nuevoBlog.documentos = blogAnterior.documentos;
    }

    // Actualizar el caso en la base de datos y obtener el número de filas afectadas
    const [numFilasActualizadas] = await Blogs.update(nuevoBlog, {
        where: { id: req.params.idBlogs, userid: req.params.userid },
    });

    // Verificar si se actualizó con éxito
    if (numFilasActualizadas > 0) {
        // Obtener el caso actualizado después de la actualización
        const blogActualizado = await Eventos.findByPk(req.params.idBlogs);

        // Enviar la respuesta JSON con el caso actualizado
        res.json(blogActualizado);
    } else {
        // Si numFilasActualizadas es 0, significa que el caso no fue encontrado o no se actualizó correctamente
        console.log('No se actualizaron filas.');
        return res.status(404).json({ mensaje: 'blog no encontrado' });
    }
    
    } catch (error) {
        console.log(error);
        next(error);
    }
};
//eliminar casos por userid y casosid
exports.eliminarBlogIdByUser = async(req,res,next) => {
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar si el caso existe para este usuario
        const blog = await Blogs.findOne({
            where: {
                id: req.params.idBlogs,
                userid: req.params.userid,
            },
        });

        if (!blog) {
            return res.status(404).json({ mensaje: 'blog no encontrado para este usuario' });
        }

        // Verificar y eliminar el archivo asociado al caso (si existe)
        if (blog.documentos) {
            const rutaArchivo = path.join(__dirname, `../uploads/blog/${blog.documentos}`);
            await fs.unlink(rutaArchivo);
        }

        // Eliminar el caso de la base de datos
        await Blogs.destroy({
            where: {
                id: req.params.idBlogs,
                userid: req.params.userid,
            },
        });

        // Enviar respuesta JSON indicando que el caso ha sido eliminado correctamente
        res.json({ mensaje: 'Blog eliminado correctamente' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.eliminarBlog = async (req, res, next) => {
    try {
        const blogAEliminar = await Blogs.findByPk(req.params.idBlogs);

        if (!blogAEliminar) {
            return res.status(404).json({ mensaje: 'Caso no encontrado' });
        }

        // Borrar el archivo asociado al caso si existe
        if (blogAEliminar.documentos) {
            const rutaArchivo = path.join(__dirname, `../uploads/blog/${blogAEliminar.documentos}` );
            await fs.unlink(rutaArchivo);
        }

         // Eliminar el caso de la base de datos
        await blogAEliminar.destroy();

        //console.log('Ruta del archivo a eliminar:', rutaArchivo); verificar la ruta
        res.json({ mensaje: 'blog eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
