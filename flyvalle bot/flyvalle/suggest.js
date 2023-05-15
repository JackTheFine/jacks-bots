const { EmbedBuilder } = require("discord.js")

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Suggest Something.'),
    async execute(interaction, client) {
      const suggest = interaction.options.getString('suggestion')
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Suggestion')
        .setURL('')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ format: 'png' })}` })
        .setThumbnail(`${interaction.user.displayAvatarURL({ format: 'png' })}`)
        .setDescription(`${suggest}`)
        .setTimestamp()
        .setFooter({ text: 'Flyvalle Bot', });
    interaction.guild.channels.cache.get('1011835704206184519').send({ embeds: [embed] }).then(embed => { embed.react("✅").then(embed.react("❌"))})
    }
}

