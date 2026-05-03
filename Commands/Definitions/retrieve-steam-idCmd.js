const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('retrieve-steam-id')
        .setDescription('Retrieves the Steam ID from a given URL.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The Steam URL to retrieve the Steam ID from.')
                .setRequired(true)),

    async execute(interaction) {
        const url = interaction.options.getString('url');
        let customurl = "";
        if (0 == url.split('/').length) {
            customurl = url;
        } else {
            customurl = url.split('/')[4];
        }
        if (!customurl) return interaction.reply('Invalid URL.');

        const response = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API_KEY}&vanityurl=${encodeURIComponent(customurl)}`).then((res) => res.json());
        const steamID = response.response.steamid;

        if (!steamID) return interaction.reply('Invalid URL.');
        interaction.reply("Steam ID: " + steamID);

    }

}