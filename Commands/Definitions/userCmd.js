const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName("user").setDescription("Replies with your info!"),
    async execute(interaction) {
        await interaction.reply(`This cmd was run by ${interaction.user.username}, who joined on ${interaction.member.joined_at}.`);
    }
};