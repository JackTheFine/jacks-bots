const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reverse')
    .setDescription('reverses the text entered')
    .addStringOption(option =>
      option.setName('reverse')
        .setDescription('thing to reverse')
        .setRequired(true)),
  async execute(interaction, client) {
    const tte = interaction.options.getString('reverse')
    return interaction.reply(tte.split("").reverse().join(""));

  },
};
