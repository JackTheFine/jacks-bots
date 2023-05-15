const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Repeats the provided message.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to repeat.')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const message = interaction.options.getString('message');
        return interaction.editReply(message);
    },
};