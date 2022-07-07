const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "filter",
  description: "Add filters to the current song",
  aliases: [],
  category: "music",
  args: false,
  usage: "<filter name>",
  run: async (client, message, args) => {
    // Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    if (!message.member.voice.channel) return message.channel.send(language("MUSIC_NOT_IN_VOICE_CHANNEL"));
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(language("MUSIC_NOT_IN_SAME_VOICE_CHANNEL"));
    if (!client.player.getQueue(message)) return message.channel.send(language("MUSIC_NOT_CURRENTLY_PLAYING"));

    if (!args[0]) return message.channel.send(language("MUSIC_FILTER_SPECIFY_FILTER"));

    const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

    if (!filterToUpdate) return message.channel.send(language("MUSIC_FILTER_DOESNOT_EXIST"));

    const filtersUpdated = {};
    filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;
    client.player.setFilters(message, filtersUpdated);

    if (filtersUpdated[filterToUpdate])
      message.channel.send(language("MUSIC_FILTER_ADDING_FILTER"));
    else
      message.channel.send(language("MUSIC_FILTER_DISABLING_FILTER"));
  },
};
