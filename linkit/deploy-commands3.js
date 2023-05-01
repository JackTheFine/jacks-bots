const { REST, Routes } = require('discord.js');
const { clientId3, guildId3, token3 } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const commandFiles = fs.readdirSync('./linkit/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());

}


const rest3 = new REST({ version: '10' }).setToken(token3);

try {
  rest3.put(Routes.applicationCommands(clientId3), { body: commands });
  console.log('Successfully registered linkit application commands.');
} catch (error) {
  console.error(error);
}