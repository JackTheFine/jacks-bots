const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('memes')
    .setDescription('yes')
    .addStringOption(option => option.setName('text').setDescription('what is this meem').setRequired(true))
    .addAttachmentOption(option => option.setName('pic').setDescription('send meem').setRequired(true)),
  async execute(interaction, client) {
    const meme = interaction.options.getAttachment("pic")
    const texte = interaction.options.getString("text")
    client.channels.cache.get('1086833063574646856').send({ content: texte, files: [meme]})
    return interaction.reply({ content: "i send for you", ephemeral: true})
}
}