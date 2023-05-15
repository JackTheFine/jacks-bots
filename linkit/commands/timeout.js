const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require("ms")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Server Timeout Func')
        .addUserOption((option) => option.setName("member").setDescription('Person who you want to put in timeout.').setRequired(true))
 .addStringOption((option) => option.setName("time").setDescription('For how much time you want to timeout member').setRequired(true))
 .addStringOption((option) => option.setName("reason").setDescription('R/eason to put member in timeout')),
    async execute(interaction, client) {
      
      const channel = client.channels.cache.get('1084944035912876125');
const tohack = interaction.options.getUser("member")
    const member = interaction.options.getMember('member')
    const reason = interaction.options.getString('reason') || null
    const time = ms(interaction.options.getString('time'))

    if(!time) return interaction.reply({ content: "Given time is not valid, it is necessary that you provide valid time."})
    const response = await member.timeout(time, reason)

    if(!response) return interaction.reply({ content: "I am sorry but for some reason I am unable to timeout this member."})
      const embed = new EmbedBuilder()

                 .setAuthor({ name: `${interaction.user.tag}` })
                .setTitle(`Timed Out ${tohack.user.tag}.`)
                .setColor('#d47513')
                .setTimestamp()
                channel.send({ embeds: [embed] });
    return interaction.reply({ content: `${member} has been timed out for ${ms(time, { long: true })}`})

      if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply('Please drag my rank above the users rank for me to execute this command.')
    }
}