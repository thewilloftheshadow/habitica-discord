const config = require("./config.js")
const axios = require("axios");

const habiticord = axios.create({
  baseURL: "https://habitica.com/api/v3",
  timeout: 1000,
  headers: {
    "X-Client": `${process.env.SHADOW_ID}-HabiticaDiscord`,
    "x-api-user": process.env.HABITICORD_ID,
    "x-api-key": process.env.HABITICORD_TOKEN,
  },
});
const api = axios.create({
  baseURL: "https://habitica.com/api/v3",
  timeout: 1000,
  headers: {
    "X-Client": `${process.env.SHADOW_ID}-HabiticaDiscord`,
  },
});

const guildSubscribe = async function(groupid, label = false) {
  const body = {
    url: config.domain + config.webhook_url,
    enabled: true,
    type: "groupChatReceived",
    options: {
      "groupId": groupid
    }
  }
  if(label) body.label = label
  await habiticord.post("/user/webhook", body)
}

const discordmsg = async function(channelid, name, message){
  let channel = client.channels.cache.get(channelid)
  if(!channel) throw new Error("Channel not found: " + channel)
  let hooks = await channel.fetchWebhooks()
  let hh
  if(hooks) hh = hooks.find(x => x.owner.id == client.user.id)
  if(!hh) hh = await channel.createWebhook('HabiticaDiscord', {
    avatar: "http://habitica.com/static/icons/favicon_192x192.png",
    reason: 'Habitica Integration for Messages'
  })
  hh.send(message, {username: name, disableMentions: "all", split: " "})
}

const habitmsg = async function(groupid, name, message){
  return habiticord.post(`/groups/${groupid}/chat`, {"message": `${name}: ${message}`})
}

const clean = function (text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
  else return text
}

const getuser = function (input, message) {
  if (!input) return message.member
  let target = message.mentions.members.first()
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        member.user.tag === input ||
        member.user.id === input ||
        member.user.username === input ||
        (member.nickname !== null && member.nickname === input)
    )
  }
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        member.user.username.toLowerCase() + "#" + member.user.discriminator ===
          input.toLowerCase() ||
        member.user.username.toLowerCase() === input.toLowerCase() ||
        (member.nickname !== null &&
          member.nickname.toLowerCase() === input.toLowerCase())
    )
  }
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        member.user.username.startsWith(input) ||
        member.user.username.toLowerCase().startsWith(input.toLowerCase())
    )
  }
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        (member.nickname !== null && member.nickname.startsWith(input)) ||
        (member.nickname !== null &&
          member.nickname.toLowerCase().startsWith(input.toLowerCase()))
    )
  }
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        member.user.username.toLowerCase().includes(input.toLowerCase()) ||
        (member.nickname !== null &&
          member.nickname.toLowerCase().includes(input.toLowerCase()))
    )
  }
  return target
}

function toUpper(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word[0].toUpperCase() + word.substr(1)
    })
    .join(" ")
}

module.exports = {
  config, axios, mongoose, express, app, Discord, client, habiticord, api, guildSubscribe, guilds, discordmsg, clean, getuser, toUpper, habitmsg
}