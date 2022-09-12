/* const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Presupuesto2', {
	name: {
      		type: DataTypes.STRING,
      		allowNull: false,
  }
  }, {timestamps: false});
}; */



const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Presupuesto', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, correo: {
       type: DataTypes.STRING,
       allowNull: true,
    },	
      precioactual: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull: true,
      },	
  });
};