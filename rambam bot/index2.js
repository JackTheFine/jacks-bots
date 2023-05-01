const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const { token2 } = require('../config.json');
require("./deploy-commands2")

const client2 = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers] });

client2.commandsa = new Collection();
const commandaFiles = fs.readdirSync('./rambam bot/scmd').filter(file => file.endsWith('.js'));

for (const file of commandaFiles) {
  const commanda = require(`./scmd/${file}`);
  client2.commandsa.set(commanda.data.name, commanda);
}
client2.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client2.commands.set(command.data.name, command);
}

client2.once(Events.ClientReady, () => {
  console.log(`Ready! (logged into ${client2.user.tag})`);
  client2.user.setActivity(`rambam burn down`, { type: "WATCHING" })
  client2.user.setStatus("idle")
});

client2.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const commanda = client2.commandsa.get(interaction.commandName);
  const command = client2.commands.get(interaction.commandName);

  try {
    if (command) {
      await command.execute(interaction, client2, interaction.options._hoistedOptions);
    }
    if (commanda) {
      await commanda.execute(interaction, client2, interaction.options._hoistedOptions);
    }
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client2.login(token2)