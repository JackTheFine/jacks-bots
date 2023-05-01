const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Server kick')
        .addUserOption((option) => option.setName('user').setDescription('The person who you want to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason to kixk member').setRequired(true)),
    async execute(interaction, client) {
      
      const channel = client.channels.cache.get('1084944035912876125');

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.reply("😅 | Unable to get details related to given member.");
        const reason = interaction.options.getString('reason')

        if(!member.kickable || member.user.id === client.user.id) 
        return interaction.reply("😅 | I am unable to kick this member");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply('Given member have higher or equal rank as you so i can not kick them.')
        
        const embed = new EmbedBuilder()
        .setDescription(`**${member.user.tag}** is kicked from LinkIt for \`${reason}\``)
        .setColor("GREEN")
        .setFooter("Ban Member")
        .setTimestamp()
        channel.send({embeds: [embed]})
        await member.user.send(`You are kicked from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
        member.kick({ reason })

        return interaction.reply({content: "Member Kicked.", ephemeral: true})
    }
}
