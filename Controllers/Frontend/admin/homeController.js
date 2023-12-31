const Usuario = require('../../../Models/Usuario'); // Importa tu modelo de usuario si lo tienes
const Evento=require('../../../Models/Eventos'); 
const Noticias=require('../../../Models/Noticias'); 
const blog=require('../../../Models/Blogs');
exports.homeAdmin = (req,res) =>{
    res.render('admin/home',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false
});
}


exports.register = (req,res) =>{
    const successMessage = req.session.successMessage;
    const errorMessage = req.session.errorMessage;
    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    delete req.session.errorMessage;
    res.render('admin/mantenimientoUsuario/register',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false,
        successMessage,
        errorMessage,
});
}

exports.blogRegister = (req,res) =>{
    res.render('admin/blog/blogRegister',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false,
});
}

exports.BlogEditar = async (req,res) =>{
    const Blogs = req.params.idBlogs;
    const blog = await Noticias.findByPk(Blogs, {
        include: Usuario,
    });    // Limpiar el mensaje para que no se muestre más de una vez
    res.render('admin/blog/blogEditar',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        blog,
        isFooter: false

});
}
exports.blogHome = async (req,res) =>{
    const blogs = await blog.findAll() //Obtener todo los usuarios en la tabla
    res.render('admin/blog/home',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        isFooter: false,
        blogs
});
}
exports.BlogsEditar = async (req,res) =>{
    const blogId = req.params.idBlog;
    const blogUsuario = await blog.findByPk(blogId, {
        include: Usuario,
    });    // Limpiar el mensaje para que no se muestre más de una vez
    res.render('admin/blog/blogEditar',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        blogUsuario,
        isFooter: false

});
}

exports.Noticias = async (req,res) =>{
    const successMessage = req.session.successMessage;
    const noticias = await Noticias.findAll() //Obtener todo los usuarios en la tabla
    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    res.render('admin/noticias/home',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        noticias,
        successMessage,
        isFooter: false

});
}
exports.NoticiasEditar = async (req,res) =>{
    const noticiaId = req.params.idNoticias;
    const noticia = await Noticias.findByPk(noticiaId, {
        include: Usuario,
    });    // Limpiar el mensaje para que no se muestre más de una vez
    res.render('admin/noticias/noticiaEditar',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        noticia,
        isFooter: false

});
}


exports.noticiaRegister = (req,res) =>{
    const successMessage = req.session.successMessage;

    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    res.render('admin/noticias/noticiaRegister',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        successMessage,
        isFooter: false

});
}

exports.Eventos = async (req,res) =>{

    const successMessage = req.session.successMessage;
    // Obtener usuarios desde la base de datos
    const eventos = await Evento.findAll() //Obtener todo los usuarios en la tabla
// Obtener el mensaje de la sesión si existe
   

// Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    res.render('admin/evento/home', {
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        eventos,
        successMessage,
        isFooter: false// Pasar la lista de usuarios a la vista
    });

}

exports.eventoRegister = (req,res) =>{

    const successMessage = req.session.successMessage;
    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
    res.render('admin/evento/eventoRegister',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        successMessage,
        isFooter: false

});
}

exports.editarEvento = async(req,res) =>{
    const eventoId= req.params.idEvento;
    const evento= await Evento.findByPk(eventoId, { 
        include:Usuario,})
    
    res.render('admin/evento/editarEvento',{
        isHome: false,
        isCliente: false,
        isJobs: false,
        isAdmin: true,
        evento,
        isFooter: false

    });
}

exports.formMantenimientoUsu = async (req,res) =>{
    try {
        // Obtener usuarios desde la base de datos
        const usuarios = await Usuario.findAll() //Obtener todo los usuarios en la tabla
    // Obtener el mensaje de la sesión si existe
    const successMessage = req.session.successMessage;

    // Limpiar el mensaje para que no se muestre más de una vez
    delete req.session.successMessage;
        res.render('admin/mantenimientoUsuario/mantenimientoUsu', {
            isHome: false,
            isCliente: false,
            isJobs: false,
            isAdmin: true,
            isFooter: false,
            usuarios: usuarios,
            successMessage// Pasar la lista de usuarios a la vista
        });
    } catch (error) {
        // Manejar el error apropiadamente
        res.status(500).send('Error obteniendo usuarios');
    }
}
exports.formVerDatos = async (req,res) =>{
    try {
        
        const usuarios = await Usuario.findByPk(req.params.id);
        res.render('admin/mantenimientoUsuario/verDatos',{
            isHome: false,
            isCliente: false,
            isJobs: false,
            isAdmin: true,
            usuarios,
            isFooter: false
    
        });
    } catch (error) {
        // Manejar el error apropiadamente
        res.status(500).send('Error obteniendo usuarios');
    }
}
exports.formEditarUser = async (req,res) =>{
    try {
        
        const usuarios = await Usuario.findByPk(req.params.idUsu);
        res.render('admin/mantenimientoUsuario/editarUsu',{
            isHome: false,
            isCliente: false,
            isJobs: false,
            isAdmin: true,
            usuarios,
            isFooter: false
    
        });
    } catch (error) {
        // Manejar el error apropiadamente
        res.status(500).send('Error obteniendo usuarios');
    }
}