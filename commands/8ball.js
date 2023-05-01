const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('gives a fortune')
    .addStringOption(option => option.setName('question').setDescription('The question you want to ask').setRequired(true)),
  async execute(interaction, client) {

    var fortunes = [
      "Yes.",
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes definelty.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now...",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good...",
      "Very doubtful.",
    ];
    return interaction.reply(
      fortunes[Math.floor(Math.random() * fortunes.length)]
    )
    return
  }
}