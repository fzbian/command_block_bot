const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const path = require("path");
const config = require("./config/bot.js")
const { Player } = require('discord-player');

client.config = require('./config/bot');
client.commands = new Discord.Collection();
client.owner = config.discord.owner;
client.version = `Version ${config.discord.version}`;
client.player = new Player(client);
client.emotes = config.emojis;
client.filters = config.filters;
client.commands = new Discord.Collection();

const commands = [];

fs.readdirSync("./commands/").forEach((subfolder) => {
  let fullPath = path.join("./commands", subfolder);
  fs.readdirSync(fullPath).forEach((file) => {
    commands.push(`./${fullPath}/${file}`);
  });
});

commands.map((file) => {
  const command = require(file);
  client.commands.set(command.name, command);
})

fs.readdirSync("./events/").forEach((file) => {
    let event = file.substring(0, file.length - 3),
      content = require(`./events/${file}`);
    client.on(event, content.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
})

client.login(config.discord.token);
