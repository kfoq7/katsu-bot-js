const express = require('express')
const { Client, Intents, Collection } = require('discord.js')

const token = process.env.TOKEN_DISCORD

class DiscordBot {
  options = {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES
    ],
    handlers: ['command_handler', 'event_handler', 'distube_handler', 'suggestions_handler'],
    color: 'F7EC16'
  }

  constructor() {
    this.client = new Client({ intents: this.options.intents })
    this.client.color = this.options.color
  }

  handlers() {
    this.options.handlers.forEach(handler => {
      require(`../handlers/${handler}`)(this.client, require('discord.js'))
    })
  }

  collections() {
    this.client.commands = new Collection()
    this.client.events = new Collection()
  }

  keep_alive() {
    const server = express()
    server.all('/', (req, res) => {
      res.send('Result: [OK]')
    })

    server.listen(3000, () => {
      console.log('Server is now ready | ' + Date.now())
    })
  }

  login() {
    this.collections()
    this.handlers()

    this.keep_alive()

    this.client.login(token)
  }
}

module.exports = DiscordBot
