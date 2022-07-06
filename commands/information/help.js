const { MessageEmbed } = require("discord.js");
const DB = require("better-sqlite3");
const settings = new DB("database/settings.db");

module.exports = {
  name: "help",
  description: "Help command",
  aliases: ["cmd", "cmds"],
  category: "information",
  args: false,
  usage: "[commandName]",
  run: async (client, message, args) => {
    //Language
    let file = settings.prepare("SELECT * FROM settings WHERE guildid = ?").get(message.guild.id);
    const guildLanguage = settings.language || "english";
    const language = require(`../../languages/${guildLanguage}`);

    let prefix = settings
      .prepare("SELECT prefix FROM settings WHERE guildid = ?")
      .get(message.guild.id).prefix;
    if (args[0]) {
      let commandName = args[0];
      const command =
        client.commands.get(commandName) ||
        client.commands.find(
          (command) => command.aliases && command.aliases.includes(commandName)
        );
      if (command && command.category != "development") {
        const embed = new MessageEmbed()
          .setColor("#f4f4f4")
          .setAuthor(`${language("INFORMATION_HELP")} | ${commandName}`)
          .setDescription(
            `> **[${languaje("INFORMATION_HELP_DESCRIPTION")}]**
          > \`${command.description}\`
          > 
          > **[${languaje("INFORMATION_HELP_ALIASES")}]**
          > \`${
            command.aliases.length === 0
              ? `"${languaje("INFORMATION_HELP_ALIASES")}`
              : command.aliases.join("`, `")
          }\`
          > 
          > **[${languaje("INFORMATION_HELP_USAGE")}]**
          > \`${prefix}${commandName} ${command.usage}\``
          )
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        await message.channel.send(embed);
      } else {
        const embed = new MessageEmbed()
          .setColor("#f4f4f4")
          .setDescription(`${language("INFORMATION_HELP_COMMAND_NOT_FOUND", commandName)}`)
          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        message.channel.send(embed);
      }
    } else {
      let msg = await message.channel.send(`${language("INFORMATION_HELP_WAIT_A_MOMENT")}`);
      setTimeout(() => {
        let embed = new MessageEmbed()
          .setColor("#f4f4f4")
          .setAuthor(`${language("INFORMATION_HELP")} | ${client.user.username}`)
          .setDescription(
            `> **[${language("INFORMATION_HELP_COMMANDS_ADMINISTRATION")}]**
          > \`${client.commands
            .filter((cmd) => cmd.category === "administration")
            .keyArray()
            .join("`, `")}\`
          > 
          > **[${language("INFORMATION_HELP_COMMANDS_FUNNY")}]**
          > \`${client.commands
            .filter((cmd) => cmd.category === "funny")
            .keyArray()
            .join("`, `")}\`
          > 
          > **[${language("INFORMATION_HELP_COMMANDS_INFORMATION")}]**
          > \`${client.commands
            .filter((cmd) => cmd.category === "information")
            .keyArray()
            .join("`, `")}\`
          > 
          > **[${language("INFORMATION_HELP_COMMANDS_MODERATION")}]**
          > \`${client.commands
            .filter((cmd) => cmd.category === "moderation")
            .keyArray()
            .join("`, `")}\`
          > 
          > **[${language("INFORMATION_HELP_COMMANDS_MUSIC")}]**
          > \`${client.commands
            .filter((cmd) => cmd.category === "music")
            .keyArray()
            .join("`, `")}\`
          > 
          > **[${language("INFORMATION_HELP_COMMANDS_UTILITY")}]**
          > \`${client.commands
            .filter((cmd) => cmd.category === "utility")
            .keyArray()
            .join("`, `")}\``
          )

          .setTimestamp()
          .setFooter(client.version, client.user.displayAvatarURL());
        message.author
          .send(embed)
          .then(() => {
            msg.edit(`${language("INFORMATION_HELP_CHECK_PRIVATE_MESSAGES")}`);
          })
          .catch(() => {
            msg.edit(`${language("INFORMATION_HELP_MESSAGE_NO_POSIBLE_TO_SEND")}`);
          });
      }, 2000);
      await msg.delete({ timeout: 5000 });
      message.delete().catch(console.error);
    }
  },
};
