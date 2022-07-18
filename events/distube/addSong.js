const { MessageEmbed } = require('discord.js')

module.exports = (queue, song) => {
  const msgEmbed = new MessageEmbed()
    .setTitle(`**${song.name}**`)
    .setURL(song.url)
    .setThumbnail(song.thumbnail)
    .setAuthor({
      name: 'Added to queue',
      iconURL: `${song.user.displayAvatarURL({ dynamic: true })}`
    })
    .setFields(
      { name: '**Request by**', value: `**\`${song.user.username}\`**`, inline: true },
      { name: '**Song Duration**', value: `**\`${song.formattedDuration}\`**`, inline: true },
      { name: '**Position in queue', value: `\`${song}\``, inline: true }
    )
    .setFooter({ text: '✅ | Use `?queue` to see the queue.' })

  queue.textChannel.send({
    embeds: [msgEmbed]
  })
}
