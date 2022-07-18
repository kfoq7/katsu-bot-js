module.exports = {
  name: 'ping',
  aliases: [],
  execute: (client, message, args, cmd, Discord) => {
    message.channel.send('pong!')
  }
}
