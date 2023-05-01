const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pong'),
  async execute(interaction, client) {
    return interaction.reply(`pong ${client.ws.ping}ms`)
}
}