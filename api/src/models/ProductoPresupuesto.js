const { DataTypes } = require('sequelize');
const {Presupuesto} = require ('./Presupuesto')
const {Producto} = require ('./Producto')



module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('ProductoPresupuesto', {
      PresupuestoId: {
            type: DataTypes.INTEGER,
            references: {
              model: Presupuesto, // 'Movies' would also work
              key: 'id'
            }
          },
          ProductoId: {
            type: DataTypes.INTEGER,
            references: {
              model: Producto, // 'Actors' would also work
              key: 'id'
            }
          },        Cantidad: {
            type: DataTypes.STRING,
            allowNull: true,
          },  Precio: {
            type: DataTypes.STRING,
            allowNull: true,
          },     
    }, {timestamps: false});    
  };