const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "clear-queue",
  description: "Clears the queue that is currently in",
  aliases: ["cq"],
  category: "music",
  args: false,
  usage: "",
  run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    if (!message.member.voice.channel) return message.channel.send(language("MUSIC_NOT_IN_VOICE_CHANNEL"));
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(language("MUSIC_NOT_IN_SAME_VOICE_CHANNEL"));
    if (!client.player.getQueue(message)) return message.channel.send(language("MUSIC_NOT_CURRENTLY_PLAYING"));
    if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(language("MUSIC_CLEAR_QUEUE_ONLY_ONE_SONG_IN_CHANNEL"));

    client.player.clearQueue(message);
    message.channel.send(language("MUSIC_CLEAR_QUEUE_HAS_JUST_BEEN_REMOVED"));
  },
};
