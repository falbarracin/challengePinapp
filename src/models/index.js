const { Sequelize } = require('sequelize');
const config = require('../config/config.js')['development'];


  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      options: {
        useUTC: false,
        requestTimeout: 3000
      }
    },
    timezone: '+00:00',
    logging: console.log 
  });

  async function verifyConnection() {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos establecida correctamente.');
      return true;
    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error);
      return false;
    }
  }

const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection successfully.');
    } catch (error) {
      console.error('Unable to connect:', error);
    }
  };
  
  module.exports = {
    sequelize,
    connectDB,
    verifyConnection
  };