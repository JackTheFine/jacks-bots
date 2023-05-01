const fs = require('fs');
const moment = require('moment');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Bot Uptime'),
    async execute(interaction, client) {
        require('moment-duration-format')
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    return interaction.reply(duration)
    }
}
