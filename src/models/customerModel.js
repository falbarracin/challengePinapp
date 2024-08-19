const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    field: 'Id',
    autoIncrement: true,  
    primaryKey: true 
  },
  nombre: {
    type: DataTypes.STRING,
    field: 'Nombre',
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    field: 'Apellido',
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    field: 'Edad',
    allowNull: false,
  },
  fechaNacimiento: {
    type: DataTypes.DATE,
    field: 'FechaDeNacimiento',
    allowNull: false,
  },
  }, {
    tableName: 'cliente', 
    timestamps: false, 
  });

module.exports = Customer;