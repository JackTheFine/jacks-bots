const fs = require('fs');
const moment = require('moment')
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Get information about a server member.')
        .addUserOption(option => option.setName('target').setDescription('The member to see info of.').setRequired(true)),
    async execute(interaction, client) {
        const Target = interaction.options.getMember('target');
    const Member = interaction.guild.members.cache.get(Target.id)
    const Response = new EmbedBuilder()
      .setAuthor(`${Target.user.tag}`, Target.displayAvatarURL({ dynamic: true }))
      .setThumbnail(Target.displayAvatarURL({ dynamic: true }))
      .addField("UserID", `${Target.id}`, false)
      .addField("Roles", `${Member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
      .addField("Server Member Since", `${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}`)
      return interaction.reply({ embeds: [Response] })
    }
}
