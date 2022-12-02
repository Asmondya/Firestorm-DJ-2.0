module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'song'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
    const song = queue.songs[0]
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle('Current song')
          .setDescription(
            `**[${currentSong.duration}]** ${currentSong.title}\n\n [Watch on YouTube](${currentSong.url})`
          )
          .setThumbnail(currentSong.thumbnail)
          .setColor('#206694')
      ]
    })
  }
}
