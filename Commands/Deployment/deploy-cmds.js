const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

// Defines all commands in an Array
const commands = [];

// Grabs all the command files from the commands directory
const foldersPath = path.join(__dirname, '../Definitions');
const commandDefs = fs.readdirSync(foldersPath);

// Grabs the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandDefs) {
    if (file.endsWith('.js')) {
        const filePath = path.join(foldersPath, file);
        const command = require(filePath);

        // Adds the command to the Array in the form of a JSON
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.CLIENT_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        // const data = await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();