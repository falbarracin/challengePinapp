require('dotenv').config();

module.exports = {
    development: {
    //   username: process.env.DB_USER,  // solo si usas autenticación SQL
    //   password: process.env.DB_PASSWORD,  // solo si usas autenticación SQL
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mssql',
      dialectOptions: {
        options: {
          encrypt: false,  // Si usas Azure SQL
          trustServerCertificate: true // Para conexiones locales, puede ser necesario
        }
      }
    }
  };