const Eventos = require('../Models/Eventos');
const Usuario = require('../Models/Usuario');
//const EventoCat= require('../Models/CategoriaEvento')
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path'); // Importar el módulo path


const configuracionMulter = {
    limits: { fileSize: 5000000 },  // límite de tamaño en bytes
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            let destinationFolder;
        
            if (file.fieldname === 'documentos') {
                destinationFolder = path.join(__dirname, '../uploads/eventos/documentos');
            } else if (file.fieldname === 'imagen') {
                destinationFolder = path.join(__dirname, '../uploads/eventos/imagen');
            } else {
                return next(new Error('Tipo de archivo no válido'));
            }
        
            next(null, destinationFolder);
        },
        filename: (req, file, next) => {
            const extension = file.originalname.split('.').pop();  // obtener la extensión del archivo original
            next(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, next) => {
        let allowedFileTypes;

        // Define los tipos de archivo permitidos según el campo del formulario
        if (file.fieldname === 'documentos') {
            allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        } else if (file.fieldname === 'imagen') {
            allowedFileTypes = ['image/jpeg', 'image/png'];
        } else {
            return next(new Error('Tipo de archivo no válido'));
        }

        if (allowedFileTypes.includes(file.mimetype)) {
            // el formato es válido
            next(null, true);
        } else {
            // el formato no es válido
            next(new Error('Formato no válido'), false);
        }
    }
};

const upload = multer(configuracionMulter).fields([
    { name: 'documentos', maxCount: 5 },
    { name: 'imagen', maxCount: 5}
]);
// sube archivo en el servidor
exports.subirArchivo = (req, res, next) => {
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

// Agregar Eventos
exports.nuevoEvento = async (req, res, next) => {
    try {
        const evento = new Eventos(req.body);

        // Verificar si req.user y req.user.id están definidos
        if (req.user && req.user.id) {
            evento.userid = req.user.id;
        } else {
            // Manejar el caso en que req.user o req.user.id no estén definidos
            throw new Error('El usuario no está autenticado o no tiene un ID válido.');
        }

        // Verificar si se ha subido un documento
        if (req.files && req.files['documentos'] && req.files['documentos'][0].filename) {
            evento.documentos = req.files['documentos'][0].filename;
        }

        // Verificar si se ha subido una imagen
        if (req.files && req.files['imagen'] && req.files['imagen'][0].filename) {
            evento.imagen = req.files['imagen'][0].filename;
        }

        // Almacenar un registro
        await evento.save();
        res.redirect('/admin/eventos');
    } catch (error) {
        // Si hay un error
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
        // Llama a next solo si necesitas pasar el control al siguiente middleware
        // De lo contrario, puedes omitir next()
        next();
    }
};
// Mostrar Eventos
exports.mostrarEventos = async(req,res,next) =>{
    
    try {
        // obtener todos los casos
        const evento = await Eventos.findAll({});
        res.json(evento);
    } catch (error) {
        console.log(error);
        next();
    }

}


    // Mostrar Evento por ID
exports.mostrarEventosID = async (req, res, next) => {
    try {
        const eventos = await Eventos.findByPk(req.params.idEventos);

        if (!eventos) {
            res.json({ mensaje: 'El evento no existe' });
            return next();
        }
         //mostrar el cliente
        res.json(eventos);

    } catch (error) {
        console.error(error);
        next(error);
    }
};

/*exports.editar = async (req, res) => {

    const { id } = req.params

    // Validar que la propiedad exista
    const eventos = await Eventos.findByPk(id)

    if (!eventos) {
        return res.redirect('/admin/eventos/editar')
    }

    res.render('admin/evento/editarEvento.ejs', {
        datos: eventos,
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false
    })
}*/


 // Actualizar un Evento via id 
 exports.actualizarEvento = async (req, res, next) => {
    try {
        // Construir un nuevo evento con los datos actualizados
        let eventoActualizado = req.body;

        // Obtener el evento anterior para obtener nombres de archivos antiguos
        const eventoAnterior = await Eventos.findByPk(req.params.idEventos);

        if (!eventoAnterior) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }

        // Verificar si hay un nuevo archivo (documentos)
        if (req.files && req.files['documentos'] && req.files['documentos'][0].filename) {
            // Si hay un nuevo archivo, asignar el nombre del archivo al eventoActualizado
            eventoActualizado.documentos = req.files['documentos'][0].filename;

            // Borrar el archivo antiguo (documentos)
            if (eventoAnterior.documentos) {
                const rutaArchivoAntiguoDocumentos = path.join(__dirname, `../uploads/eventos/documentos/${eventoAnterior.documentos}`);
                await fs.unlink(rutaArchivoAntiguoDocumentos);
            }
        } else {
            // Si no hay un nuevo archivo, mantener el nombre del archivo antiguo
            eventoActualizado.documentos = eventoAnterior.documentos;
        }

        // Verificar si hay un nuevo archivo (imagen)
        if (req.files && req.files['imagen'] && req.files['imagen'][0].filename) {
            // Si hay un nuevo archivo, asignar el nombre del archivo al eventoActualizado
            eventoActualizado.imagen = req.files['imagen'][0].filename;

            // Borrar el archivo antiguo (imagen)
            if (eventoAnterior.imagen) {
                const rutaArchivoAntiguoImagen = path.join(__dirname, `../uploads/eventos/imagen/${eventoAnterior.imagen}`);
                await fs.unlink(rutaArchivoAntiguoImagen);
            }
        } else {
            // Si no hay un nuevo archivo, mantener el nombre del archivo antiguo
            eventoActualizado.imagen = eventoAnterior.imagen;
        }

        // Actualizar el evento en la base de datos
        await eventoAnterior.update(eventoActualizado);

        res.redirect('/admin/eventos');
    } catch (error) {
        console.log('Error al actualizar:', error);
        next(error);
    }
};

exports.encontrarEventosByUser = async (req, res, next) => {
    try {
        const Userid  = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            next();
        }
        const eventos = await Eventos.findAll({
            where: { userid: req.params.userid },
        });
        res.json(eventos);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//mostrar casos por userid y casosid
exports.buscarEventosByUser = async (req,res,next) =>{
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Evento  no encontrado' });
        }
        // Verificar si el caso existe para este usuario
        const evento = await Eventos.findOne({
            where: {
                id: req.params.idEventos,
                userid: req.params.userid,
            },
        });
        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento  no encontrado para este usuario' });
        }
        
        res.json(evento);

    } catch (error) {
        console.error(error);
        next(error);
    }
}

//actualizar casos por userid y casosid
exports.actualizarEventoIdByUser = async (req, res, next) => {
    try {
        const Userid = await Usuario.findByPk(req.params.userid);
        if (!Userid) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const evento = await Eventos.findOne({
            where: {
                id: req.params.idEventos, // Suponiendo que tienes un parámetro para identificar el caso
                userid: req.params.userid,
            },
        });

        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado para este usuario' });
        }
    // Construir un nuevo caso
    let nuevoEvento = req.body;

    // Verificar si hay un archivo nuevo
    if (req.file && req.file.filename) {
        nuevoEvento.documentos = req.file.filename;

        // Obtener el caso anterior para borrar el archivo antiguo
        let eventoAnterior = await Eventos.findByPk(req.params.idEventos);
        if (eventoAnterior.documentos) {
            // Construir la ruta completa al archivo antiguo
            const rutaArchivoAntiguo = path.join(__dirname, `../uploads/casos/${eventoAnterior.documentos}`);

            // Borrar el archivo antiguo
            await fs.unlink(rutaArchivoAntiguo);
        }
    } else {
        // Obtener el caso anterior para mantener el nombre del documento
        let eventoAnterior = await Eventos.findByPk(req.params.idEventos);
        nuevoEvento.documentos = eventoAnterior.documentos;
    }

    // Actualizar el caso en la base de datos y obtener el número de filas afectadas
    const [numFilasActualizadas] = await Eventos.update(nuevoEvento, {
        where: { id: req.params.idEventos, userid: req.params.userid },
    });

    // Verificar si se actualizó con éxito
    if (numFilasActualizadas > 0) {
        // Obtener el caso actualizado después de la actualización
        const eventoActualizado = await Eventos.findByPk(req.params.idEventos);

        // Enviar la respuesta JSON con el caso actualizado
        res.json(eventoActualizado);
    } else {
        // Si numFilasActualizadas es 0, significa que el caso no fue encontrado o no se actualizó correctamente
        console.log('No se actualizaron filas.');
        return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
    
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//eliminar casos por userid y casosid
exports.eliminarEventoIdByUser = async(req,res,next) => {
    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(req.params.userid);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Verificar si el caso existe para este usuario
        const evento = await Eventos.findOne({
            where: {
                id: req.params.idEventos,
                userid: req.params.userid,
            },
        });

        if (!evento) {
            return res.status(404).json({ mensaje: 'Evento no encontrado para este usuario' });
        }

        // Verificar y eliminar el archivo asociado al caso (si existe)
        if (evento.documentos) {
            const rutaArchivo = path.join(__dirname, `../uploads/eventos/${evento.documentos}`);
            await fs.unlink(rutaArchivo);
        }

        // Eliminar el caso de la base de datos
        await Eventos.destroy({
            where: {
                id: req.params.idEventos,
                userid: req.params.userid,
            },
        });

        // Enviar respuesta JSON indicando que el caso ha sido eliminado correctamente
        res.json({ mensaje: 'Evento eliminado correctamente' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.eliminarEventos = async (req, res, next) => {
    try {
        const eventoAEliminar = await Eventos.findByPk(req.params.idEventos);

        if (!eventoAEliminar) {
            return res.status(404).json({ mensaje: 'Evento no encontrado' });
        }

        // Borrar el archivo asociado al caso si existe
        if (eventoAEliminar.documentos) {
            const rutaArchivo = path.join(__dirname, `../uploads/eventos/documentos/${eventoAEliminar.documentos}` );
            await fs.unlink(rutaArchivo);
        }

        if (eventoAEliminar.imagen) {
            const rutaArchivo = path.join(__dirname, `../uploads/eventos/imagen/${eventoAEliminar.imagen}` );
            await fs.unlink(rutaArchivo);
        }

         // Eliminar el caso de la base de datos
        await eventoAEliminar.destroy();

        //console.log('Ruta del archivo a eliminar:', rutaArchivo); verificar la ruta
        //res.json({ mensaje: 'Caso eliminado exitosamente' });
        res.redirect('/admin/eventos');
    } catch (error) {
        console.log(error);
        next(error);
    }
};
exports.obtenerEventos = async (req, res) => {
    try {
        const eventos = await Eventos.findAll();
        if (eventos.length === 0) {
            res.status(404).send('No hay  eventos disponibles');
        } else {
            res.send(eventos);
        }    } catch (error) {
        res.status(500).send('Hubo un error');
    }

};