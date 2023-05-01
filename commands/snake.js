const { MessageEmbed } = require('discord.js');
const Discord = module.require("discord.js");
const { Snake } = require("discord-gamecord")

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snake')
    .setDescription('snake game'),

  async execute(interaction, client) {
    new Snake({
      message: interaction,
      slash_command: true,
      embed: {
        title: 'Snake Game',
        color: '#5865F2',
        OverTitle: "Game Over",
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢' },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️',
        right: '➡️',
        down: '⬇️',
        left: '⬅️',
      },
      othersMessage: 'You are not allowed to use buttons for this message!',
    }).startGame();
  },
};