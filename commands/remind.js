const ms = require('ms')
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('reminds u')
    .addStringOption(option =>
      option.setName('time')
        .setDescription('time')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reminder')
        .setDescription('reminder')
        .setRequired(true)),
  async execute(interaction, client) {

    const reminder = interaction.options.getString('reminder')
    const time = interaction.options.getString('time')


    const exampleEmbed1 = new EmbedBuilder()
      .setColor('#E0082F')
      .setTitle('Reminder set.')
      .setAuthor({ name: 'Rambam Bot', iconURL: null, url: null })
      .addFields(
        { name: 'Reminder:', value: `${reminder}` },
        { name: 'In how long?', value: `${time}` },
        // { name: 'Inline field title', value: 'Some value here', inline: true },
        // { name: 'Inline field title', value: 'Some value here', inline: true },
      )
      .setTimestamp()
      .setFooter({ text: 'Rambam Bot', iconURL: null });

    interaction.reply({ embeds: [exampleEmbed1] });

    setTimeout(function() {

      interaction.channel.send(`<@${interaction.user.id}>`)
      const exampleEmbed = new EmbedBuilder()
        .setColor('#088BE0')
        .setTitle('Reminder!')
        .setAuthor({ name: 'Rambam Bot', iconURL: null, url: null })
        .setDescription('Reminder for ' + `<@${interaction.user.id}>`)
        .addFields(
          { name: 'Here is your reminder!', value: `${reminder}` },
          // { name: '\u200B', value: '\u200B' },
          // { name: 'Inline field title', value: 'Some value here', inline: true },
          // { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        //.addField('Inline field title', 'Some value here', true)
        .setTimestamp()
        .setFooter({ text: 'Rambam Bot', iconURL: null });


      interaction.channel.send({ embeds: [exampleEmbed] });

    }, ms(time));
    return
  }
}
