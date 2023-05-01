const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('robloxverify')
        .setDescription('Roblox Verification'),
    async execute(interaction, client) {
        interaction.reply("Roblox Verification has not been added yet.")
    }
}
