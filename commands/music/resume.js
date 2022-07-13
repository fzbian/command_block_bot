const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "resume",
  description: "Continue the song that you had paused",
  aliases: [],
  category: "music",
  args: false,
  usage: "",
  run: async (client, message, args) => {
    // Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    if (!message.member.voice.channel) return message.channel.send(language("MUSIC_NOT_IN_VOICE_CHANNEL"));
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(language("MUSIC_NOT_IN_SAME_VOICE_CHANNEL"));
    if (!client.player.getQueue(message)) return message.channel.send(language("MUSIC_NOT_CURRENTLY_PLAYING"));

    if (!client.player.getQueue(message).paused) return message.channel.send(language("MUSIC_RESUME_ALREDY_PLAYING"));

    const success = client.player.resume(message);
    if (success) return message.channel.send(language("MUSIC_RESUME_RESUMED", client.player.getQueue(message).playing.title))
  },
};
