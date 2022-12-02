module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`Y'a rien a skip qu'est-ce que tu racontes ? :face_with_raised_eyebrow:`)
    try {
      const song = await queue.skip()
      message.channel.send(`Je me disais bien qu'elle était naze cette musique!\n Musique suivante:\n${song.name}`)
    } catch (e) {
      message.channel.send(`${e}`)
    }
  }
}
