const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token4 } = require('../config.json');
const { MessageEmbed } = require('discord.js')
require("./deploy-commands4")


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./ftcli/ftcli').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./ftcli/${file}`);
  client.commands.set(command.data.name, command);
} 

client.once('ready', () => {
  console.log(`Ready! (logged into ${client.user.tag})`);
  client.user.setActivity("rev control hub page", {type: "WATCHING"})
  client.user.setStatus("online")
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client, interaction.options._hoistedOptions);
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token4);