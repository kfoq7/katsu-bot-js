module.exports = {
  name: 'setup-speak',
  aliases: ['st-speak', 'stsk'],
  execute: async (client, message, args, cmd, Discord) => {
    const langs = ['en', 'es', 'pt', 'ja', 'ko', 'th', 'ru']
    const lang = args[0]

    if (!args.length || !langs.includes(lang)) {
      return message.channel.send(
        `You have to sepecify the language. Available languages: \`<${langs
          .map(lang => `${lang}`)
          .toString()
          .replace(/,/g, ' - ')}>\``
      )
    }

    client.language = lang
    message.channel.send(`**The speak language has been changed to \`<${lang}>\`**`)
  }
}
