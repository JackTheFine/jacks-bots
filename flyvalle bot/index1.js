const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, token1 } = require('../config.json');
const { MessageEmbed } = require('discord.js')
require("./deploy-commands1")

const client1 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });

client1.commandsb = new Collection();
const commandbFiles = fs.readdirSync('./flyvalle bot/flyvalle').filter(file => file.endsWith('.js'));

for (const file of commandbFiles) {
  const commandb = require(`./flyvalle/${file}`);
  client1.commandsb.set(commandb.data.name, commandb);
}
client1.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client1.commands.set(command.data.name, command);
}

client1.once('ready', () => {
  console.log(`Ready! (logged into ${client1.user.tag})`);
  client1.user.setActivity(`all these flights.`, { type: "WATCHING" })
  client1.user.setStatus("online")
});

client1.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const commandb = client1.commandsb.get(interaction.commandName);
  const command = client1.commands.get(interaction.commandName);


  try {
    if (command) {
      await command.execute(interaction, client1, interaction.options._hoistedOptions);
    }
    if (commandb) {
      await commandb.execute(interaction, client1, interaction.options._hoistedOptions);
    }
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client1.login(token1)