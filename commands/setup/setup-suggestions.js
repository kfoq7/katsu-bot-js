const setupSchema = require('../../models/setup.js')

module.exports = {
  name: 'setup-suggestion',
  aliases: ['setupsuggestion'],
  execute: async (client, message, args, cmd, Discord) => {
    if (!args.length) return message.channel.send('You have to specifity the suggestions channel!')

    const channel = message.guild.channels.cache.get(args[0] || message.mentions.channels.first())
    if (!channel || channel.type !== 'GUILD_TEXT')
      return message.channel.send('The suggestion channel does not exits')

    await setupSchema.findOneAndUpdate({ guildId: message.guild.id }, { suggestions: channel.id })

    return message.reply({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle(`Establecido el canal de sugerencias a \`${channel.name}\``)
          .setDescription(
            `*Every time one person send a message in ${channel}, i will convert into a suggestion!*`
          )
      ]
    })
  }
}
