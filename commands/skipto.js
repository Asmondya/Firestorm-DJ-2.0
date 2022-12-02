module.exports = {
  name: 'skipto',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Y'a rien a skip qu'est-ce que tu racontes ? :face_with_raised_eyebrow:`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Merci de donner le temps (en secondes)`)
    }
    const num = Number(args[0])
    if (isNaN(num)) return message.channel.send(`${client.emotes.error} | Un nombre valide stp :unamused:`)
    await client.distube.jump(message, num).then(song => {
      message.channel.send({ content: `Skipped to: ${song.name}` })
    })
  }
}
