const moment = require('moment')
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ui')
    .setDescription('shows userinfo')
    .addUserOption(option => option.setName('target').setDescription('The member to see info of').setRequired(true)),
  async execute(interaction, client) {
    const Target = interaction.options.getMember('target');
    const Member = interaction.guild.members.cache.get(Target.id)
    const Response = new EmbedBuilder()
      .setAuthor({ name: Target.user.tag, iconurl: Target.displayAvatarURL({ dynamic: true })})
      .setThumbnail(Target.displayAvatarURL({ dynamic: true }))
      .setColor('#303030')
      .addFields(
        { name: "UserID", value: `${Target.id}`, inline: false },
        { name: "Roles", value: `${Member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`},
        { name: "Server Member Since", value: `${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}`}
      )
    return interaction.reply({ embeds: [Response] })

  }
}