const fs = require('fs')

module.exports = (client, Discord) => {
  const loadDir = dirs => {
    const eventFile = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'))

    for (const file of eventFile) {
      const event = require(`../events/${dirs}/${file}`)
      const eventName = file.split('.').shift()
      client.on(eventName, event.bind(null, Discord, client))
    }
  }

  ;['client', 'guild'].forEach(e => loadDir(e))
}
