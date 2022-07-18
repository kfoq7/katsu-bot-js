const fs = require('fs')

module.exports = (client, Discord) => {
  const command_file = fs.readdirSync('./commands')

  const loadCommand = (file, command) => {
    const commandName = file.split('.').shift()
    client.commands.set(commandName, command)
  }

  for (const file of command_file) {
    if (file.endsWith('.js')) {
      const command = require(`../commands/${file}`)
      loadCommand(file, command)
    } else {
      const folder = file

      fs.readdirSync(`./commands/${folder}`).forEach(file => {
        const command = require(`../commands/${folder}/${file}`)
        loadCommand(file, command)
      })
    }
  }
}
