const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Server Banning')
        .addUserOption((option) => option.setName('user').setDescription('The person who you want to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason to ban member').setRequired(true)),
    async execute(interaction, client) {
      const channel = client.channels.cache.get('1084944035912876125');

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.reply("Unable to get details related to given member.");
        const reason = interaction.options.getString('reason')

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.reply("I am unable to ban this membe.");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply('Please drag my rank above the users rank for me to execute this command.')
        
        const embed = new EmbedBuilder()
          .setAuthor({name: interaction.user.tag })
        .setDescription(`**${member.user.tag}** is banned by Foxy for \`${reason}\``)
        .setColor("Orange")
        .setFooter("Member Ban")
        .setTimestamp()
channel.send({ embeds: [embed]})
        await member.user.send(`You are banned from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
        member.ban({ reason })

        return interaction.reply({ content: "User banned.", ephemeral: true})
    }
}
