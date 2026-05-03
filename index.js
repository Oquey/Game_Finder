// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Defines all commands as a Collection
client.commands = new Collection();

// Defines all cooldowns as a Collection
client.cooldowns = new Collection();

// Adds commands from the Definitions folder to the Collection
const foldersPath = path.join(__dirname, 'Commands', 'Definitions');
const commandDefs = fs.readdirSync(foldersPath);

for (const file of commandDefs) {
	if (file.endsWith('.js')) {
		const filePath = path.join(foldersPath, file);
		const command = require(filePath);

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Adds events from the Events folder to the Collection
const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath);

for (const file of eventFiles) {
	if (file.endsWith('.js')) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

// Log in to Discord with your client's token
client.login(process.env.CLIENT_TOKEN);