const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "queue",
  description: "Look at the songs that are in the queue",
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

    message.channel.send(
      `**Server queue - ${message.guild.name} ${client.emotes.queue} ${
        client.player.getQueue(message).loopMode ? "(looped)" : ""
      }**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` +
        (queue.tracks
          .map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${
              track.author
            } (requested by : ${track.requestedBy.username})`;
          })
          .slice(0, 5)
          .join("\n") +
          `\n\n${
            queue.tracks.length > 5
              ? `And **${queue.tracks.length - 5}** other songs...`
              : `In the playlist **${queue.tracks.length}** song(s)...`
          }`)
    );
  },
};
