module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
    queue.stop()
    message.channel.send(`https://tenor.com/view/doug-maclean-doug-maclean-stop-stop-sign-gif-26222438`)
  }
}
