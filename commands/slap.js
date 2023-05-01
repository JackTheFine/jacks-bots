const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('slaps the user')
    .addUserOption(option => option.setName('target').setDescription('The member to slap').setRequired(true)),

  async execute(interaction, client) {
    let member = interaction.options.getMember('target');
    const embed = new Discord.EmbedBuilder()
      .setTitle(`${interaction.user.tag}` + " slapped :raised_back_of_hand: " +
        member.displayName +
        ", " +
        member.displayName +
        " is now in the hospital! :hospital:")
    return interaction.reply({ embeds: [embed] });
  },
};