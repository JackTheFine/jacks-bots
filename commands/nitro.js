
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nitro')
    .setDescription('gives a fake nitro link'),

  async execute(interaction, client) {
    var links = [
      `https://discord.gift/Hejs82hejdi9`,
      `https://discord.gift/ejf88rjcUw8i`,
      `https://discord.gift/aujtjc68Wisa`,
      `https://discord.gift/aueuhdjx8eo9`,
      `https://discord.gift/aytjx1juy8Wf`,
    ];
    var images = [
      `https://cdn.discordapp.com/attachments/716917641209708647/748945266979242106/IMG_20200828_215650.jpg`,
      `https://cdn.discordapp.com/attachments/716917641209708647/748945228907413675/IMG_20200828_220208.jpg`,
    ];
    const embed = new EmbedBuilder()
      .setTitle("Here is your Nitro")
      .setDescription(links[Math.floor(Math.random() * links.length)])
      .setImage(images[Math.floor(Math.random() * images.length)])
    interaction.reply({ embeds: [embed] });

  },
};