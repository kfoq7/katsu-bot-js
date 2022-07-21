const dbConnectMongo = require('../../config/dbMongo')

module.exports = async client => {
  console.log("I'm ready")
  dbConnectMongo()
}
