require('dotenv').config();

const dbConnectionSettings = {
   uri : process.env.DB_CON,
   databaseName: 'Shop',  
}

module.exports = dbConnectionSettings