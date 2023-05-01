const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('repeats what you said')
    .addStringOption(option =>
      option.setName('tosay')
        .setDescription('what to say')
        .setRequired(true)),

  async execute(interaction, client) {
    const ttb = interaction.options.getString('tosay')
    const text = ttb.split(' ').slice().join(' ');
    interaction.channel.send(text)
    return interaction.reply({ content: 'Message repeated!!', ephemeral: true })

  }
}