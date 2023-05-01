const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('charleymemes')
    .setDescription('yes')
    .addAttachmentOption(option => option.setName('pic').setDescription('charley only or get ban').setRequired(true)),
  async execute(interaction, client) {
    const charley = interaction.options.getAttachment("pic")
    client.channels.cache.get('1086833063574646856').send({ content: "Charley pic", files: [charley]})
    return interaction.reply({ content: "i send for you", ephemeral: true})
}
}