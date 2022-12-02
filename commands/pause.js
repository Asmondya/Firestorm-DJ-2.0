module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There's nothing to pause... :face_with_raised_eyebrow:`)
    if (queue.paused) {
      queue.resume()
      return message.channel.send(':arrow_forward:')
    }
    queue.pause()
    message.channel.send(':pause_button:')
  }
}
