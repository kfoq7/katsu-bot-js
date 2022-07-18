const fs = require('fs')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')

module.exports = client => {
  client.distube = new DisTube(client, {
    emitNewSongOnly: false,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    searchSongs: 0,
    nsfw: false,
    emptyCooldown: 25,
    ytdlOptions: {
      highWaterMark: 1024 * 1024 * 64,
      quality: 'highestudio',
      format: 'audioonly',
      liveBuffer: 60000,
      dlChunkSize: 1024 * 1024 * 4
    },
    youtubeDL: false,
    plugins: [
      new SpotifyPlugin({
        parallel: true,
        emitEventsAfterFetching: true
      }),
      new SoundCloudPlugin()
    ]
  })

  const eventDistube = fs.readdirSync('./events/distube')

  for (const file of eventDistube) {
    const event = require(`../events/distube/${file}`)
    const eventName = file.split('.').shift()
    client.distube.on(eventName, event.bind(null))
  }
}
