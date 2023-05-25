console.log(`
██████╗  ██████╗ ████████╗███████╗         
██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝         
██████╔╝██║   ██║   ██║   ███████╗         
██╔══██╗██║   ██║   ██║   ╚════██║         
██████╔╝╚██████╔╝   ██║   ███████║██╗██╗██╗
╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝╚═╝╚═╝
 `)
const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const fs = require('node:fs');
const { token } = require('../config.json');
//require("../quotes/index")
require("./deploy-commands")
require("../flyvalle bot/index1")
//require("../rambam bot/index2")
//require("../linkit/index3")
//require("../ftcli/index4")

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.data.name, command);
}
client.commandsa = new Collection();
const commandaFiles = fs.readdirSync('./mybot/special').filter(file => file.endsWith('.js'));

for (const file of commandaFiles) {
  const commanda = require(`./special/${file}`);
  client.commandsa.set(commanda.data.name, commanda);
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! (logged into ${c.user.tag})`);
  client.user.setPresence({
  activities: [{ name: `coding.mp3`, type: ActivityType.Listening }],
  status: 'idle',
})});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand() && !interaction.isModalSubmit()) return;
  const command = client.commands.get(interaction.commandName);
  const commanda = client.commandsa.get(interaction.commandName);
  
  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'myModal') {
      const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
	const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
		await interaction.reply({ content: `${favoriteColor} ${hobbies}` });
	}
  }


  try {
    if (command) {
      await command.execute(interaction, client, interaction.options._hoistedOptions);
    }
    if (commanda) {
      await commanda.execute(interaction, client, interaction.options._hoistedOptions);
    }
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);
console.log(`
██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗██╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝██║
██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝ ██║
██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝  ╚═╝
██║  ██║███████╗██║  ██║██████╔╝   ██║   ██╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝   ╚═╝
`)