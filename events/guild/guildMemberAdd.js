module.exports = async (Discord, client, guildMember) => {
  const role = guildMember.guild.roles.cache.find(r => r.id === '836090204364210206')
  guildMember.roles.add(role)
}
