const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Cliente', {
	idCliente: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       allowNull: false,
       primaryKey: true
       },
    nombreyapellido: {
      type: DataTypes.STRING,
      allowNull: true,
    }, correo: {
       type: DataTypes.STRING,
       allowNull: true,
    },	
      telefonofijo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: true,
      }		
  }, {timestamps: false});
};