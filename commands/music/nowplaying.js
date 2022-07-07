const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "nowplaying",
  description: "Get information about the song that is playing at this moment",
  aliases: ["np"],
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

    const track = client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach(
      (filterName) => client.player.getQueue(message).filters[filterName]
    )
      ? filters.push(filterName)
      : false;

    message.channel.send({
      embed: {
        color: "RED",
        author: { name: track.title },
        fields: [
          { name: language("MUSIC_NOW_PLAYING_CHANNEL"), value: track.author, inline: true },
          {
            name: language("MUSIC_NOW_PLAYING_REQUESTED_BY"),
            value: track.requestedBy.username,
            inline: true,
          },
          {
            name: language("MUSIC_NOW_PLAYING_FROM_PLAYLIST"),
            value: track.fromPlaylist ? language("MUSIC_NOW_PLAYING_YES") : language("MUSIC_NOW_PLAYING_NO"),
            inline: true,
          },

          { name: language("MUSIC_NOW_PLAYING_VIEWS"), value: track.views, inline: true },
          { name: "Duration", value: track.duration, inline: true },
          {
            name: language("MUSIC_NOW_PLAYING_DURATION"),
            value: filters.length + "/" + client.filters.length,
            inline: true,
          },

          {
            name: language("MUSIC_NOW_PLAYING_VOLUME"),
            value: client.player.getQueue(message).volume,
            inline: true,
          },
          {
            name: language("MUSIC_NOW_PLAYING_REPEAT_MODE"),
            value: client.player.getQueue(message).repeatMode ? language("MUSIC_NOW_PLAYING_YES") : language("MUSIC_NOW_PLAYING_NO"),
            inline: true,
          },
          {
            name: language("MUSIC_NOW_PLAYING_CURRENTLY_PAUSED"),
            value: client.player.getQueue(message).paused ? language("MUSIC_NOW_PLAYING_YES") : language("MUSIC_NOW_PLAYING_NO"),
            inline: true,
          },

          {
            name: language("MUSIC_NOW_PLAYING_PROGRSS_BAR"),
            value: client.player.createProgressBar(message, {
              timecodes: true,
            }),
            inline: true,
          },
        ],
        thumbnail: { url: track.thumbnail },
        timestamp: new Date(),
      },
    });
  },
};
