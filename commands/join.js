const { joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
  name: 'Join',
  aliases: [],
  async execute(client, message, args, cmd, Discord) {
    const voice_channel = message.member.voice.channel

    if (!voice_channel) return message.channel.send('You need to be in a voice channel!')

    if (cmd === 'join') {
      joinVoiceChannel({
        channelId: voice_channel.id,
        guildId: message.guild.id,
        adapterCreator: voice_channel.guild.voiceAdapterCreator
      })
    }
  }
}
