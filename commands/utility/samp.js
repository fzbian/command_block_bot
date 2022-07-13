// Packages
const Discord = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");
const query = require('samp-query')


module.exports = {
  name: "samp",
  description: "Command to get information from a samp server",
  aliases: [],
  category: "utility",
  args: true,
  usage: "<ip>",
  run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    var queryOptions = {
        host: args.join(" ")
    }
    
    query(queryOptions, function (error, response) {
        if(error) {
            message.channel.send(language("SAMP_CANT_GET_INFO"))
            console.log(error)
        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle(language("SAMP_SERVER_INFO"))
            .addFields(
                { name: language("SAMP_SERVER_INFO_HOSTNAME"), value: response.hostname },
                { name: language("SAMP_SERVER_INFO_GAMEMODE"), value: response.gamemode, inline: true },
                { name: language("SAMP_SERVER_INFO_LANGUAGE"), value: response.mapname, inline: true },
                { name: language("SAMP_SERVER_INFO_PLAYERS"), value: response.online + "/" + response.maxplayers, inline: true },
                { name: language("SAMP_SERVER_INFO_VERSION"), value: response.rules.version , inline: true },
                { name: language("SAMP_SERVER_INFO_WEB"), value: response.rules.weburl , inline: true }
            )
            message.channel.send(embed)
        }
    })
  }
};