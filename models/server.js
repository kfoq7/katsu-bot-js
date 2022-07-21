const { Schema, model } = require('mongoose')

const serverSchema = new Schema({
  guildId: String,
  prefix: String
})

const Server = model('ConfigServer', serverSchema)

module.exports = Server
