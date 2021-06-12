const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "ping",
  description: "The bot response pong",
  aliases: [],
  category: "utility",
  args: false,
  usage: "",
  run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = file.language || "english";
    const language = require(`../../languages/${guildLanguage}`);
    
    message.channel.send(language("PING", Math.floor(message.createdTimestamp - Date.now())));
  }
};

