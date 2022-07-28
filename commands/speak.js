const { getAudioUrl } = require('google-tts-api')
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice')

module.exports = {
  name: 'speak',
  aliases: ['sp', 'tts'],
  execute: async (client, message, args, cmd, Discord) => {
    const voiceChannel = message.member.voice.channel
    const messageSpeak = args.join(' ')

    if (!args[0]) return message.channel.send('You should specify the message!')
    if (messageSpeak.length > 200)
      return message.channel.send('The message is too long. `max length 200`')
    if (!voiceChannel) return message.channel.send('You are not in voice channel!')

    const audioURL = getAudioUrl(messageSpeak, {
      lang: client.language,
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000
    })

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
      })

      const player = createAudioPlayer()
      connection.subscribe(player)

      const resorce = createAudioResource(audioURL, { inlineVolume: true })
      player.play(resorce)
    } catch (error) {
      message.channel.send('There was an error executing this command!')
      console.log(error)
    }
  }
}
