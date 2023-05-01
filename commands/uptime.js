const moment = require('moment')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Shows the bots uptime'),

  async execute(interaction, client) {
    require('moment-duration-format')
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    return interaction.reply(duration)
  }
}