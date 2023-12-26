const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Usuario = require('./Usuario.js');

const Blogs =  db.define('Blogs',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty : {
                msg: 'Agregar un Titulo'
            }
        }
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha:{
        type: DataTypes.DATEONLY,
        allowNull : false,
        validate: {
            notEmpty :{
                msg: 'Agrega una fecha para el blog '
            }
        }
    },
    categoria: {
        type: DataTypes.JSON, // Almacenar un arreglo JSON de strings
        allowNull: false,
        defaultValue: '[]', // Valor por defecto: un arreglo vacío
        get() {
            const categoriaValue = this.getDataValue('categoria');
            return categoriaValue ? JSON.parse(categoriaValue) : [];
        },
        set(value) {
            // Obtener el valor actual de categorías
            let categorias = this.getDataValue('categoria');
            categorias = categorias ? JSON.parse(categorias) : [];

            // Verificar si el valor es un string o un arreglo de strings
            if (typeof value === 'string') {
                // Agregar la nueva categoría al arreglo existente
                categorias.push(value);
            } else if (Array.isArray(value)) {
                // Agregar múltiples categorías al arreglo existente
                categorias = categorias.concat(value);
            }

            // Eliminar duplicados y asignar el nuevo arreglo de categorías como JSON
            categorias = [...new Set(categorias)]; // Eliminar duplicados
            this.setDataValue('categoria', JSON.stringify(categorias));
        }
    },
    imagen:{
        type:DataTypes.STRING(100)
    }

});
// // Definir la relación entre Usuario y Blogs
Usuario.hasMany(Blogs, { foreignKey: 'userid' });
Blogs.belongsTo(Usuario, { foreignKey: 'userid' });


module.exports = Blogs;