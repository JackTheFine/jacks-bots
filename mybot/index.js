console.log(`
██████╗  ██████╗ ████████╗███████╗         
██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝         
██████╔╝██║   ██║   ██║   ███████╗         
██╔══██╗██║   ██║   ██║   ╚════██║         
██████╔╝╚██████╔╝   ██║   ███████║██╗██╗██╗
╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝╚═╝╚═╝
 `)
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const { token } = require('../config.json');
//require("../quotes/index")
require("./deploy-commands")
//require("../flyvalle bot/index1")
require("../rambam bot/index2")
require("../linkit/index3")
//require("../ftcli/index4")

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! (logged into ${c.user.tag})`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);


  try {
    if (command) {
      await command.execute(interaction, client, interaction.options._hoistedOptions);
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