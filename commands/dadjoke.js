const giveMeAJoke = require('discord-jokes');
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('gives you a dadjoke'),

  async execute(interaction, client) {
    // To get a random dad joke
    giveMeAJoke.getRandomDadJoke(function(joke) {


      return interaction.reply({ content: `${joke}` })
    });

  }
}
