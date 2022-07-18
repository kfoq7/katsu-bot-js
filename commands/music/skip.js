module.exports = {
  name: 'skip',
  aliases: ['s'],
  execute: (client, message, args, cmd, Discord) => {
    const voice_channel = message.member.voice?.channel
    const queue = client.distube.getQueue(message)

    if (!queue) return message.channel.send('There are no song playing now!')
    if (!voice_channel) return message.channel.send('You must be in a voice channel!')
    if (!args.length) return message.channel.send('You must especify the song')

    client.distube.skip(message)
  }
}
