const Discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yomama')
    .setDescription('puts yomama before your message')
    .addStringOption(option =>
      option.setName('yomama')
        .setDescription('thing to yomamaify')
        .setRequired(true)),
  async execute(interaction, client) {
    const ymm = interaction.options.getString('yomama')
    return interaction.reply(`Yo mama ${ymm}`);
  },
};
