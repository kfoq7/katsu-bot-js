const { Schema, model } = require('mongoose')

const votesSchema = new Schema({
  messageId: String,
  yes: {
    type: Array,
    default: []
  },
  no: {
    type: Array,
    default: []
  },
  author: {
    type: String,
    default: ''
  }
})

const VotesSug = model('Votes-Suggestions', votesSchema)

module.exports = VotesSug
