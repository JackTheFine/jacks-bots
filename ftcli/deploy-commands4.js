const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId4, guildId, token4 } = require('../config.json');

const commands = [];

const commandFiles = fs.readdirSync('./ftcli/ftcli').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./ftcli/${file}`);
	commands.push(command.data.toJSON());

}

const rest = new REST({ version: '9' }).setToken(token4);

try {
  rest.put(Routes.applicationCommands(clientId4), { body: commands });
  console.log('Successfully registered ftcli application commands.');
} catch (error) {
  console.error(error);
}