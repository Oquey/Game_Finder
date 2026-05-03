const { SlashCommandBuilder } = require('discord.js');

// Hot swap commands without re-running the bot.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.options.getString('command');
        const command = interaction.client.commands.get(commandName);
        if (!command) return interaction.reply(`Command ${commandName} not found.`);
        try {
            delete require.cache[require.resolve(`../Definitions/${commandName}Cmd.js`)];
            const newCommand = require(`../Definitions/${commandName}Cmd.js`);
            interaction.client.commands.set(commandName, newCommand);
            interaction.reply(`Command ${commandName} reloaded.`);
        } catch (error) {
            console.error(error);
            interaction.reply(`Error reloading command ${commandName}.`);
        }
    }
};