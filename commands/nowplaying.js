module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'song'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    const song = queue.songs[0]
    message.channel.send(`${client.emotes.play} | I'm playing **\`${song.name}\`**, by ${song.user}`)
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
