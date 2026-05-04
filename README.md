# 🎮 Game Finder Discord Bot

Game Finder is a Discord bot designed to help gamers discover their next favorite game. By analyzing your Steam account's recently played games and cross-referencing your library, it uses AI to suggest new titles you don't already own.

## ✨ Features

- **Steam ID Retrieval**: Quickly convert a Steam profile URL into a Steam ID.
- **AI-Powered Recommendations**: Uses Google's Gemini AI to analyze your gaming history and recommend **3-5 similar titles** you might enjoy.
- **Smart Library Filtering**: Automatically fetches your owned games to ensure the bot never recommends something you already have.
- **Smart Sorting**: Prioritizes games based on recent activity and total playtime to understand your current interests.
- **Command Cooldowns**: Built-in 30-second cooldown on resource-heavy commands to prevent spam.
- **Slash Commands**: Fully integrated with Discord's modern slash command system.

## 🛠️ Commands

- `/retrieve-steam-id [url]`: Takes a Steam profile URL and returns the numeric Steam ID.
- `/recommend-new-game [steam-id]`: Fetches your recently played and owned games, then provides 3-5 tailored AI recommendations. *(30s cooldown)*
- `/reload [command]`: (Admin) Reloads a specific command's logic without restarting the bot.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- A Discord Bot Token (from the [Discord Developer Portal](https://discord.com/developers/applications))
- A Steam API Key (from the [Steam Community API](https://steamcommunity.com/dev/apikey))
- A Google Gemini API Key (from [Google AI Studio](https://aistudio.google.com/))

### Installation
> [!WARNING]
> This bot is currently still in development. Upon release, this section will be updated for other servers/users to use.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Oquey/Game_Finder.git
   cd Game_Finder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   CLIENT_TOKEN=your_discord_bot_token
   CLIENT_ID=your_discord_client_id
   GUILD_ID=your_guild_id
   STEAM_API_KEY=your_steam_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Deploy Slash Commands**:
   ```bash
   npm run deploy
   ```

5. **Start the Bot**:
   ```bash
   npm start
   ```

## 🏗️ Project Structure

- `index.js`: Main entry point for the bot.
- `Commands/`: Contains command definitions and deployment scripts.
  - `Definitions/`: Individual slash command logic (e.g., `recommend-new-gameCmd.js`).
  - `Deployment/`: Script to register commands with Discord.
- `Events/`: Event handlers for bot status and interactions.
- `package.json`: Project metadata, scripts, and dependencies.

## ⚖️ Legal

By using this bot, you agree to our:
- [Terms of Service](TERMS_OF_SERVICE.md)
- [Privacy Policy](PRIVACY_POLICY.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
