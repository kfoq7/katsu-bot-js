const { Schema, model } = require('mongoose')

const setupSchema = new Schema({
  guildId: String,
  suggestions: { type: String, default: '' }
})

const Setup = model('setup', setupSchema)

module.exports = Setup
