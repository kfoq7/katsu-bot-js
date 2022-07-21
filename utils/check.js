const { serverModel, setupModel } = require('../models')

const checkDatabase = async values => {
  const { guildId } = values
  let data = await serverModel.findOne({ guildId })

  if (!data) {
    console.log('There was no database, creating one...')
    data = serverModel.create(values)
    setupModel.create({ guildId })
  }
}

module.exports = {
  checkDatabase
}
