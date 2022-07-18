require('dotenv').config()

const DiscordBot = require('./client')
const client = new DiscordBot()

client.login()

module.exports = client
