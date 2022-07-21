const mongoose = require('mongoose')

const { MONGO_DB_URL } = process.env

const dbConnectMongo = () => {
  try {
    mongoose.connect(MONGO_DB_URL)
  } catch (err) {
    console.log(err)
  }
}

module.exports = dbConnectMongo
