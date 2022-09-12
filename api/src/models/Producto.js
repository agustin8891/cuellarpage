/* const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Producto2', {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },      
    }, {timestamps: false});    
  }; */



  const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Producto', {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true }, 
      nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },preciodistribuidor: {
          type: DataTypes.FLOAT,
          allowNull: true,
      },descdistribuidor: {
      type: DataTypes.STRING,
      allowNull: true,
      } ,costocuellar: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },totalconporcentaje: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },porcentaje: {
        type: DataTypes.STRING,
        allowNull: true,
      },image: {
        type: DataTypes.STRING,
        allowNull: true,
      },   
    },{timestamps:false});
  };