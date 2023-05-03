const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('warns the mentioned person')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('add warnings')
                .addUserOption(option => option.setName('target').setDescription('The member to give a demerit to').setRequired(true))
      .addStringOption(option => option.setName('reason').setDescription('warn reasoning').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('remove warnings')
                .addUserOption(option => option.setName('target').setDescription('The member to remove a demerit from').setRequired(true))
          .addStringOption(option => option.setName('reason').setDescription('warn reasoning').setRequired(true)))
      .addSubcommand(subcommand =>
      subcommand
        .setName('check')
        .setDescription('check warnings')
        .addUserOption(option => option.setName('target').setDescription('The member to check warnings of').setRequired(true))),
    async execute(interaction, client) {
      if (interaction.guild =! "1015128770639831051") { console.log(":(")}
        var abc = false
        const tohack = interaction.options.getMember('target');
        const channel = client.channels.cache.get('1084944035912876125');
        const demerits = JSON.parse(fs.readFileSync("./linkit/demerits.json", "utf-8") || "");
      const a = interaction.options.getString('reason')
        switch (interaction.options._subcommand) {
            case 'add':
                if (demerits[tohack.user.tag]) demerits[tohack.user.tag].count++;
                else demerits[tohack.user.tag] = { name: tohack.displayName, count: 1 };

                fs.writeFileSync("./linkit/demerits.json", JSON.stringify(demerits));
                interaction.reply(`Warning Given to ${tohack.displayName}`)

                const embed = new EmbedBuilder()

                 .setAuthor({ name: `${interaction.user.tag}` })
                .setTitle(`Gave a Warning to ${tohack.displayName} for ${a}.`)
                .setColor('#03fc2c')
                .setTimestamp()
                channel.send({ embeds: [embed] });
            return tohack.user.send(`You got a warning in FoxTech for: ${a}. Please use better judgement in the future to prevent further actions.`)
                break;
            case 'remove':
                if (demerits[tohack.user.tag].count == '0') return interaction.reply(`${tohack.displayName} needs a warning before being able to remove one!`)
                if (demerits[tohack.user.tag]) demerits[tohack.user.tag].count--;
                else return interaction.reply(`${tohack.displayName} doesnt have any Warnings.`)
    
                fs.writeFileSync("./linkit/demerits.json", JSON.stringify(demerits));
                interaction.reply(`Warning removed from ${tohack.displayName}`)

                const embed2 = new EmbedBuilder()

                 .setAuthor({ name: `${interaction.user.tag}` })
                .setTitle(`Removed a Warning from ${tohack.displayName}.`)
                .setColor('#03fc2c')
                .setTimestamp()
                channel.send({ embeds: [embed2] });
            return tohack.user.send(`Your warning: ${a} has expired.`)
                break;
            case 'check':
        interaction.reply(demerits[tohack.user.tag] ? `${tohack.displayName} has ${demerits[tohack.user.tag].count} warning${demerits[tohack.user.tag].count != 1 ? "s" : ""}!` : "This user has no warnings.");
              const embed3 = new EmbedBuilder()

                 .setAuthor({ name: `${interaction.user.tag}` })
                .setTitle(`Checked ${tohack.displayName}s Warnings.`)
                .setColor('#03fc2c')
                .setTimestamp()
                channel.send({ embeds: [embed3] });
        break;
        }

    }
}