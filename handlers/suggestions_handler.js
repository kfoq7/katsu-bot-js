const { setupModel, votesModel } = require('../models')

module.exports = (client, Discord) => {
  client.on('messageCreate', async message => {
    try {
      if (!message.guild || !message.channel || message.author.bot) return

      let setupData = await setupModel.findOne({ guildId: message.guild.id })
      const channel = message.guild.channels.cache.get(setupData.suggestions)

      const checkData = !setupData || !setupData.suggestions || !channel
      if (checkData || message.channel.id !== setupData.suggestions) return

      message.delete().catch(() => {})

      let buttons = new Discord.MessageActionRow().addComponents([
        new Discord.MessageButton()
          .setStyle('SECONDARY')
          .setLabel('0')
          .setEmoji('✅')
          .setCustomId('votes_yes'),
        new Discord.MessageButton()
          .setStyle('SECONDARY')
          .setLabel('0')
          .setEmoji('❌')
          .setCustomId('votes_no'),
        new Discord.MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Whos voted?')
          .setEmoji('❓')
          .setCustomId('see_votes')
      ])

      const msg = await message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setColor(client.color)
            .setAuthor({
              name: `${message.author.tag}' Suggestions`,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setDescription(`>>> ${message.content}`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .addField('✅ __Positive votes__', '```0 votes```', true)
            .addField('❌ __Negative votes__', '```0 votes```', true)
            .setFooter({
              text: 'Do you want suggestion something else? Just send it here!',
              iconURL:
                'https://i.pinimg.com/originals/58/44/bc/5844bca645f465ace4c2a412a4bec59b.png'
            })
        ],
        components: [buttons]
      })

      votesModel.create({
        messageId: msg.id,
        author: message.author.id
      })
    } catch (error) {
      console.log(error)
    }
  })

  client.on('interactionCreate', async interaction => {
    try {
      const userId = interaction.user.id

      if (!interaction.guild || !interaction.channel || !interaction.message || !interaction.user)
        return

      let [setupData, msgData] = await Promise.all([
        setupModel.findOne({ guildId: interaction.guild.id }),
        votesModel.findOne({ messageId: interaction.message.id })
      ])

      if (
        !msgData ||
        !setupData ||
        !setupData.suggestions ||
        interaction.channelId !== setupData.suggestions
      )
        return

      switch (interaction.customId) {
        case 'votes_yes':
          if (msgData.yes.includes(userId)) {
            return interaction.reply(
              `You have voted YES already on suggestion! from <@${msgData.author}>`
            )
          }

          if (msgData.no.includes(userId)) msgData.no.splice(msgData.no.indexOf(userId))
          msgData.yes.push(userId)
          msgData.save()

          interaction.message.embeds[0].fields[0].value = `\`\`\`${msgData.yes.length}\`\`\``
          interaction.message.embeds[0].fields[1].value = `\`\`\`${msgData.no.length}\`\`\``

          interaction.message.components[0].components[0].label = `${msgData.yes.length}`
          interaction.message.components[0].components[1].label = `${msgData.no.length}`

          await interaction.message.edit({
            embeds: [interaction.message.embeds[0]],
            components: [interaction.message.components[0]]
          })

          interaction.deferUpdate()

          break
        case 'votes_no':
          if (msgData.no.includes(userId)) {
            return interaction.reply(
              `You have voted YES already on suggestion! from <@${msgData.author}>`
            )
          }

          if (msgData.yes.includes(userId)) msgData.yes.splice(msgData.no.indexOf(userId))
          msgData.no.push(userId)
          msgData.save()

          interaction.message.embeds[0].fields[0].value = `\`\`\`${msgData.yes.length}\`\`\``
          interaction.message.embeds[0].fields[1].value = `\`\`\`${msgData.no.length}\`\`\``

          interaction.message.components[0].components[0].label = `${msgData.yes.length}`
          interaction.message.components[0].components[1].label = `${msgData.no.length}`

          await interaction.message.edit({
            embeds: [interaction.message.embeds[0]],
            components: [interaction.message.components[0]]
          })

          interaction.deferUpdate()

          break
        case 'see_votes':
          interaction.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setTitle('Suggestion Votes')
                .addField(
                  '✅ Positive Votes',
                  msgData.yes.length >= 1
                    ? msgData.yes.map(u => `<@${u}>\n`).toString()
                    : 'There are no votes',
                  true
                )
                .addField(
                  '❌ Negative Votes',
                  msgData.no.length >= 1
                    ? msgData.no.map(u => `<@${u}>\n`).toString()
                    : 'There are no votes',
                  true
                )
                .setColor(client.color)
            ],
            ephemeral: true
          })

          break
      }
    } catch (err) {
      console.log(err)
    }
  })
}
