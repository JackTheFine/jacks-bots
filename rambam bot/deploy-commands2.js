const { REST, Routes } = require('discord.js');
const { clientId2, guildId2, token2 } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.push(command.data.toJSON());

}

const commandaFiles = fs.readdirSync('./rambam bot/scmd').filter(file => file.endsWith('.js'));

const commandsa = [];

for (const file of commandaFiles) {
  const commanda = require(`./scmd/${file}`);
  commandsa.push(commanda.data.toJSON());
}

const rest2 = new REST({ version: '10' }).setToken(token2);

try {
  rest2.put(Routes.applicationCommands(clientId2), { body: commands });
  rest2.put(Routes.applicationGuildCommands(clientId2, guildId2), { body: commandsa })
  console.log('Successfully registered rambam application commands.');
} catch (error) {
  console.error(error);
}