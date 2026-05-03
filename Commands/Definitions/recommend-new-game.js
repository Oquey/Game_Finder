const { SlashCommandBuilder, InteractionFlags } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports = {

    data: new SlashCommandBuilder()
        .setName('recommend-new-game')
        .setDescription('Recommends a new game based on the user\'s latest played games.')
        .addStringOption(option =>
            option.setName('steam-id')
                .setDescription('The Steam ID to retrieve the latest played games for.')
                .setRequired(true)),

    async execute(interaction) {
        const steamID = interaction.options.getString('steam-id');
        const response = await fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamID}`).then((res) => res.json());
        const games = response.response.games;

        if (games.length == 0) return interaction.reply('No games found.');
        let gamenames = "";
        let gamectr = 1;
        let orderedGames = orderGames(games);
        orderedGames.forEach(game => {
            gamenames += String(gamectr) + ". " + String(game.name) + "\n";
            gamectr++;
        });

        await interaction.deferReply();

        const findNewGameResult = await findNewGame(gamenames);

        await interaction.editReply({ content: gamenames + "\n\n" + "Suggested Game: " + findNewGameResult });

    }

}

// Order games by total account playtime, unless the past 2 week playtime exceeds 200 hours.
function orderGames(games) {

    // Convert all game times to hours
    games.forEach(game => {
        game.playtime_2weeks = game.playtime_2weeks / 60;
        game.playtime_forever = game.playtime_forever / 60;
    });

    games.sort((a, b) => {

        // If a game has most of it's total playtime in the past 2 weeks, and that playtime exceeds 5 hours, it goes first
        if (a.playtime_2weeks > a.playtime_forever * 0.6
            && a.playtime_2weeks > 5
            && b.playtime_2weeks < b.playtime_forever * 0.6) {
            return -1;
        } else if (a.playtime_2weeks < a.playtime_forever * 0.6
            && b.playtime_2weeks > b.playtime_forever * 0.6
            && b.playtime_2weeks > 5) {
            return 1;
        }

        // If both games have less than 50 hours played in the past 2 weeks, order by total playtime
        if (a.playtime_2weeks < 50 && b.playtime_2weeks < 50) {
            return b.playtime_forever - a.playtime_forever;
        }

        // If only one game has more than or equal to 50 hours played in the past 2 weeks, it goes first
        if (a.playtime_2weeks >= 50
            && b.playtime_2weeks < 50) {
            return -1;
        } else if (a.playtime_2weeks < 50
            && b.playtime_2weeks >= 50) {
            return 1;
        }

        // Otherwise, resort to ordering by playtime in the past 2 weeks
        return b.playtime_2weeks - a.playtime_2weeks;

    });
    return games;

}

async function findNewGame(games) {

    const prompt = `Given the following list of games, recommend a similar game related to the user's latest played games.
    
    Games:
    ${games}
    
    Output format:
    Game: [Game Name]
    `;

    const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return result.candidates.at(0).content.parts[0].text;

}