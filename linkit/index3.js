const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('node:fs');
const { token3 } = require('../config.json');
require("./deploy-commands3")

const client3 = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers] });

client3.commandsa = new Collection();
const commandaFiles = fs.readdirSync('./linkit/commands').filter(file => file.endsWith('.js'));

for (const file of commandaFiles) {
  const commanda = require(`./commands/${file}`);
  client3.commandsa.set(commanda.data.name, commanda);
}

client3.once(Events.ClientReady, () => {
  console.log(`Ready! (logged into ${client3.user.tag})`);
  client3.user.setPresence({
  activities: [{ name: `Alpha`, type: ActivityType.Watching }],
  status: 'idle',
})});

client3.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const commanda = client3.commandsa.get(interaction.commandName);

  try {
      await commanda.execute(interaction, client3, interaction.options._hoistedOptions);
  } catch (error) {
    console.error(error);
    //return interaction.reply({ content: 'There was an error while executing this command! Contact Foxy Support.', ephemeral: true });
  }
});

client3.login(token3)