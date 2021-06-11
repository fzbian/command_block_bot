const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "play",
  description: "Play a song on a voice channel",
  aliases: ["p"],
  category: "music",
  args: true,
  usage: "<name/URL>",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        `${client.emotes.error} - You're not in a voice channel !`
      );

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        `${client.emotes.error} - You are not in the same voice channel !`
      );

    if (!args[0])
      return message.channel.send(
        `${client.emotes.error} - Please indicate the title of a song !`
      );

    client.player.play(message, args.join(" "), { firstResult: true });
  },
};
