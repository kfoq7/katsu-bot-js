module.exports = {
  name: 'say',
  aliases: [''],
  async execute(client, message, args, cmd, Discord) {
    message.channel.send(args.join(' '))
  }
}
