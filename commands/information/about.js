const Discord = require("discord.js");
const config =  require("../../config/bot")
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "about",
  description: "About bot information statistics",
  aliases: [],
  category: "information",
  args: false,
  usage: "",
  run: async (client, message, args) => {

    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    let owner = client.users.cache.get(config.discord.owner)
    let seconds = (client.uptime / 1000);
    let d = Math.floor(seconds / 86400);
    let h = Math.floor(seconds / 3600);
    seconds %= 3600;
    let m = Math.floor(seconds / 60);
    let s = Math.floor(seconds % 60);
    let online = client.users.cache.filter(x => x.presence.status == "online").size.toLocaleString();
    let idle = client.users.cache.filter(x => x.presence.status == "idle").size.toLocaleString();
    let dnd = client.users.cache.filter(x => x.presence.status == "dnd").size.toLocaleString();
    let streaming = client.users.cache.filter(x => x.presence.activities.some(x => x.type == "STREAMING")).size.toLocaleString();
    let offline = client.users.cache.filter(x => x.presence.status == "offline").size.toLocaleString();
    
    const embed = new Discord.MessageEmbed()
      .setColor("#f4f4f4")
      .setDescription(`> **[${language("INFORMATION_ABOUT_ABOUTABOUT_DEVELOPER")}]**
        > ${owner.tag} (**${owner.id}**)
        > 
        > **[${language("INFORMATION_ABOUT_ABOUT_PING")}]**
        > 🏓 ${client.ws.ping} ms
        > 
        > **[${language("INFORMATION_ABOUT_UPTIME")}]**
        > ${d}d ${h}h ${m}m ${s}s
        > 
        > **[${language("INFORMATION_ABOUT_LIBRARY")}]**
        > Discord.js v${Discord.version}
        > 
        > **[${language("INFORMATION_ABOUT_COMMANDS")}]**
        > ${client.commands.size}
        > 
        > **[${language("INFORMATION_ABOUT_SERVERS")}]**
        > ${client.guilds.cache.size}
        > 
        > **[${language("INFORMATION_ABOUT_USERS")}]**
        > ${language("INFORMATION_ABOUT_USERS_HUMANS")}: ${client.users.cache.filter(x => !x.bot).size}
        > ${language("INFORMATION_ABOUT_USERS_ROBOTS")}: ${client.users.cache.filter(x => x.bot).size.toLocaleString()}
        > <:online:731414132963934249> ${online} <:idle:731414172897771603> ${idle} <:dnd:731414184881029121> ${dnd} <:streaming:731414204271165471> ${streaming} <:offline:731414156867010721> ${offline}`)
      .setTimestamp()
      .setFooter(client.version, client.user.displayAvatarURL());
    let msg = await message.channel.send(embed);
    await msg.delete({ timeout: 20000 });
    await message.delete().catch(console.error);
  }
};