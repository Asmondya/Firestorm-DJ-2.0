module.exports = {
  name: 'forward',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
    if (!args[0]) {
      return message.channel.send(`Please provide time (in seconds) to go forward!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`Un nombre valide stp :unamused:`)
    queue.seek((queue.currentTime + time))
    message.channel.send(`Forwarded the song for ${time}!`)
  }
}
