const { MessageEmbed } = require("discord.js");
const query = require('samp-query')

module.exports = {
  name: "samp",
  description: "Command to get information from a samp server",
  aliases: [],
  category: "utility",
  args: true,
  usage: "<ip>",
  run: async (client, message, args) => {
    var queryOptions = {
        host: args.join(" ")
    }
    
    query(queryOptions, function (error, response) {
        if(error) {
            message.channel.send("Can't get information from this IP, verify it and try again.")
            console.log(error)
        } else {
            const embed = new MessageEmbed()
            .setTitle("SAMP Server Information.")
            .addFields(
                { name: 'Hostname', value: response.hostname },
                { name: 'Gamemode', value: response.gamemode, inline: true },
                { name: 'Language', value: response.mapname, inline: true },
                { name: 'Players', value: response.online + "/" + response.maxplayers, inline: true },
                { name: 'Language', value: response.mapname, inline: true },
                { name: 'Version', value: response.rules.version , inline: true },
                { name: 'Web', value: response.rules.weburl , inline: true }
                .setThumbnail("https://www.sovahost.net/wp-content/uploads/2020/02/samp-logo-png-6.png")
            )
            message.channel.send(embed)
        }
    })
  }
};