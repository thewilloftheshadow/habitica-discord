require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client()
let webhook = process.env.WEBHOOK_URL

re.client.login(process.env.DISCORD_TOKEN)

re.app.get(webhook, function(req, res){
  res.sendStatus(405)
})

re.app.post(webhook, function(req, res){
  res.sendStatus(200)
  console.log(JSON.stringify(req.body, null, 2))
  if(req.body.chat.username == client.user.username) return
  if(discord) re.discordmsg(discord, `${req.body.chat.user} (${req.body.chat.username})`, req.body.chat.text)
})

re.client.once("ready", () => {
  console.log(
    `${re.client.user.username} is online in ${re.client.guilds.cache.size} guilds`
  )
  re.client.user.setPresence({
    activity: {
      name: `Habitica for new messages`,
      type: "WATCHING",
    },
    status: "idle",
  })
  re.client.guilds.cache.forEach((x) =>
    console.log(`  -${x.name} - ${x.id} (${x.members.cache.size} members)`)
  )
})

re.client.on("message", async (message) => {
  if(message.author.bot) return
  let hguild = re.guilds.get(message.channel.id)
  if(hguild) return re.habitmsg(hguild, message.author.tag, message.content)


  if (message.content.indexOf(re.config.prefix) !== 0) return
  const args = message.content.slice(re.config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if(command == "ping"){
    let m = await message.channel.send("Pinging...")
    let botLatency = Math.abs(m.createdTimestamp - message.createdTimestamp),
      ping = re.client.ws.ping,
      memory = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)

    let embed = new re.Discord.MessageEmbed()
      .setTitle(`Pong!`)
      .setThumbnail(
        re.client.user.avatarURL({ format: "png", dynamic: true, size: 1024 })
      )
      .addField("Bot Latency", `${botLatency}ms`, true)
      .addField("Ping", `${Math.round(ping)}ms`, true)
      .setTimestamp()

    m.delete()
    await message.channel.send(embed)
  }

  if(command == "group"){
    let group = await re.habiticord.get("/groups/" + args[0])
    group = group.data.data
    message.channel.send(new re.Discord.MessageEmbed().setTitle(group.name).setDescription(group.description.length < 2048 ? group.description : `Group description can be viewed [here](https://habitica.com/groups/${group.type}/${group.id})`).addField("Member Count:", group.memberCount))
  }

  if(command == "setchannel"){
    let group = await re.habiticord.get("/groups/" + args[0])
    group = group.data.data
    if(group.type == "guild"){
      await re.habiticord.post(`/groups/${group.id}/join`, {}).catch(error => {
        console.log(error.response.data.message)
      })
    } else return message.channel.send("I can only connect to public guilds right now!")
    re.guilds.set(group.id, message.channel.id)
    re.guilds.set(message.channel.id, group.id)
    message.channel.send(`You have successfully synced this channel with the ${group.name} guild on Habitica!`)
  }

  if (command == "eval" && message.author.id == re.config.ownerID) {
    try {
      const code = args.join(" ")
      let evaled = eval(code)

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled)

      if (message.content.endsWith(";1+1;")) message.delete()

      if (!message.content.endsWith(";1+1;"))
        message.channel.send(re.clean(evaled), { code: "js" })
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${re.clean(err)}\n\`\`\``)
    }
  }
})