module.exports = {
  name: 'play',
  aliases: ['p'],
  execute: (client, message, args, cmd, Discord) => {
    const voice_channel = message.member.voice?.channel

    if (!voice_channel) return message.channel.send('You must be in a voice channel!')
    if (!args.length) return message.channel.send('You must especify the song')

    client.distube.play(voice_channel, args.join(' '), {
      member: message.member,
      textChannel: message.channel,
      message
    })

    message.channel.send('🔎 Searching on **Youtube**`')
  }
}
