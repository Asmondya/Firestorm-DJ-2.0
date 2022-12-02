const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: 'help',
  aliases: ['h', 'cmd', 'command'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle('Commands')
          .setDescription(
            "**!play [url or terms]:** Plays a song from YouTube or Spotify with the provided URL or terms.\n\n**!queue :** Shows a list of the songs in the queue.\n\n**!pause :** Pauses or unpauses the current song.\n\n**!resume :** Resumes the current paused song.\n\n**!song :** Shows the currently playing song with its URL.\n\n**!skip :** Skips the current song and plays the next one in the queue.\n\n**!skipto [trachnumber]:** Skips to the song #tracknumber.\n\n**!previous :** Goes back to the previous song.\n\n**!shuffle :** Shuffles the queue. \n\n**!volume [0 to 100]:** Ajusts the volume of the bot.\n\n**!stop :** Deletes the queue.\n\n**!join :** The bot joins the voice channel.\n\n**!leave :** The bot leaves the voice channel.\n\n**!ping :** Pings the bot."
          )
          .setThumbnail('https://cdn.discordapp.com/avatars/993267712350503003/672128bf05bbc387f476c6d66fbbd38f.webp')
          .setColor('#206694')
      ]
    })
  }
}