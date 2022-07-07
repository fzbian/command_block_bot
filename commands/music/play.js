const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "play",
  description: "Play a song on a voice channel",
  aliases: ["p"],
  category: "music",
  args: true,
  usage: "<name/URL>",
  run: async (client, message, args) => {
    // Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    if (!message.member.voice.channel) return message.channel.send(language("MUSIC_NOT_IN_VOICE_CHANNEL"));
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(language("MUSIC_NOT_IN_SAME_VOICE_CHANNEL"));

    if (!args[0]) return message.channel.send(language("MUSIC_PLAY_INDICATE_TITLE_SONG"));
    client.player.play(message, args.join(" "), { firstResult: true });
  },
};
