const fs = require("fs");
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token, token1, clientId1, guildId1 } = require('../config.json');
const commandsb = [];
const commandbFiles = fs.readdirSync('./flyvalle bot/flyvalle').filter(file => file.endsWith('.js'));

for (const file of commandbFiles) {
  const commandb = require(`./flyvalle/${file}`);
  commandsb.push(commandb.data.toJSON());

}
const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.push(command.data.toJSON());

}

const rest1 = new REST({ version: '10' }).setToken(token1);
try {
  rest1.put(Routes.applicationCommands(clientId1, guildId1), { body: commandsb });
  console.log('Successfully registered flyvalle application commands.');
} catch (error) {
  console.error(error);
}