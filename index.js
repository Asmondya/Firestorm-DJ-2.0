const { DisTube } = require('distube')
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
  ]
})
const { ActivityType } = require('discord.js')
const fs = require('fs')
const dotenv = require("dotenv")
dotenv.config()
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  console.log(`${client.user.tag} is ready to play music.`)
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  const prefix = "!"
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`You must be in a voice channel!`)
  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`Error: \`${e}\``)
  }
})

// Add filters to the queue status :
// | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` 

const status = queue =>
  `Volume: \`${queue.volume}%\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(
      `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: \`${
        song.user.tag
      }\`\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `Added ${song.name} - \`${song.formattedDuration}\` to the queue by \`${song.user}\``
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`An error encountered: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', channel => channel.send('There is no one here. Im alone, again...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`No result found for \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send("https://tenor.com/view/end-thats-all-folks-gif-10601784"))

client.on("ready", () => {
  client.user.setPresence({
      activities: [{
        name: '!help',
        type: ActivityType.Watching
      }],
      status: "idle"
  })
})

client.login(process.env.TOKEN)