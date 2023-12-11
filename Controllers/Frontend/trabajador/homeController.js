const DocCasos = require('../../../Models/Casos');

exports.homeTrabajador = async (req,res) =>{
    const DocumentosCasos = await DocCasos.findAll({
        where: {userid: req.user.id}
    })
    res.render('trabajador/home',{
        isHome: false,
        isCliente: false,
        isJobs: true,
        isAdmin: false,
        DocumentosCasos:DocumentosCasos
});
}
