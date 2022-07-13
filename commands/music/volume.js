const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "volume",
  description: "Defines a volume to the song that is currently playing",
  aliases: ["vol"],
  category: "music",
  args: true,
  usage: "<volume [1-100]>",
  run: async (client, message, args) => {
    // Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    if (!message.member.voice.channel) return message.channel.send(language("MUSIC_NOT_IN_VOICE_CHANNEL"));
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(language("MUSIC_NOT_IN_SAME_VOICE_CHANNEL"));
    if (!client.player.getQueue(message)) return message.channel.send(language("MUSIC_NOT_CURRENTLY_PLAYING"));

    if (!args[0] || isNaN(args[0]) || args[0] === "Infinity") return message.channel.send(language("MUSIC_VOLUME_VALID_NUMBER"));
    if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(language("MUSIC_VOLUME_VALID_NUMBER_BETWEEN_1_AND_100"))

    const success = client.player.setVolume(message, parseInt(args[0]));
    if (success) message.channel.send(language("MUSIC_VOLUME_SET_TO", parseInt(args[0])))
  },
};
