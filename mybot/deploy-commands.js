const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.push(command.data.toJSON());

}

const rest = new REST({ version: '10' }).setToken(token);

try {
  rest.put(Routes.applicationCommands(clientId), { body: commands });
  console.log('Successfully registered Global commands');
} catch (error) {
  console.error(error);
}