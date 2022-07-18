module.exports = {
  name: 'add',
  aliases: [''],
  description: 'Add roles members',
  execute: async (client, message, args, cmd, Discord) => {
    const roleId = args.shift().replace(/<|>|@|&/gi, '')
    const role = message.guild.roles.cache.find(r => r.id === roleId)

    if (!role) {
      return message.channel.send('You must send a role as first argument `!add <@role> <members>`')
    }

    const members = args.map(member => {
      return member.replace(/<|>|@|&/gi, '')
    })

    for (const memberId of members) {
      const member = message.guild.members.cache.find(m => m.id === memberId)
      member.roles.add(role)
    }

    message.channel.send('Members has been added role!')
  }
}
