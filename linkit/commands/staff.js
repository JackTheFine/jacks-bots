const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('LinkIt staff team.'),
    async execute(interaction, client) {
      const a = interaction.reply
      const embed = new EmbedBuilder()
      .setAuthor({ name: "name"})
      .setTitle("Foxy Staff Team")
      .setDescription("ERR")
      .setFooter("Last Updated 0/00/0000")
        .addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: 'fe', value: 'gw' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
      .setTimestamp()
    }
}