const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "loop",
  description: "Loop the song that is currently playing",
  aliases: ["lp", "repeat"],
  category: "music",
  args: true,
  usage: "",
  run: async (client, message, args) => {
    // Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    if (!message.member.voice.channel) return message.channel.send(language("MUSIC_NOT_IN_VOICE_CHANNEL"));
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(language("MUSIC_NOT_IN_SAME_VOICE_CHANNEL"));
    if (!client.player.getQueue(message)) return message.channel.send(language("MUSIC_NOT_CURRENTLY_PLAYING"));

    if (args.join(" ").toLowerCase() === "queue") {
      if (client.player.getQueue(message).loopMode) {
        client.player.setLoopMode(message, false);
        return message.channel.send(language("MUSIC_LOOP_DISABLE"));
      } else {
        client.player.setLoopMode(message, true);
        return message.channel.send(language("MUSIC_LOOP_ENABLE"));
      }
    } else {
      if (client.player.getQueue(message).repeatMode) {
        client.player.setRepeatMode(message, false);
        return message.channel.send(language("MUSIC_LOOP_DISABLE"));
      } else {
        client.player.setRepeatMode(message, true);
        return message.channel.send(language("MUSIC_LOOP_ENABLE"));
      }
    }
  },
};
