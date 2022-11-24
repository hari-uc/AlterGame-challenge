//import dotenv
require('dotenv').config();


module.exports = {
  
  Development: {
    username: process.env.DB_USERNAME ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    host: process.env.DB_HOST ,
    dialect: 'mysql',
    operatorsAliases: 0,   //0
    logging: false,
    dialectOptions:{
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

  },
  Production: {
    username: process.env.DB_USERNAME ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialect: 'mysql',
    operatorsAliases: 0,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}