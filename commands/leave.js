module.exports = {
  name: 'leave',
  run: async (client, message) => {
    client.distube.voices.leave(message)
    message.channel.send(`https://tenor.com/view/penguin-leaving-gif-24228491`)
  }
}
