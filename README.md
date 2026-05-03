# 🎮 Game Finder Discord Bot

Game Finder is a Discord bot designed to help gamers discover their next favorite game. By analyzing your Steam account's recently played games and using AI-powered recommendations, it suggests new titles tailored to your gaming habits.

## ✨ Features

- **Steam ID Retrieval**: Easily convert a Steam profile URL into a Steam ID.
- **AI Recommendations**: Uses Google's Gemini AI to analyze your gaming history and recommend similar titles you might enjoy.
- **Smart Sorting**: Prioritizes games based on recent activity and total playtime to get a better sense of your current interests.
- **Slash Commands**: Fully integrated with Discord's modern slash command system.

## 🛠️ Commands

- `/retrieve-steam-id [url]`: Takes a Steam profile URL and returns the numeric Steam ID.
- `/recommend-new-game [steam-id]`: Fetches your recently played games and provides a tailored AI recommendation.
- `/reload [command]`: (Admin) Reloads a specific command's logic without restarting the bot.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- A Discord Bot Token (from the [Discord Developer Portal](https://discord.com/developers/applications))
- A Steam API Key (from the [Steam Community API](https://steamcommunity.com/dev/apikey))
- A Google Gemini API Key (from [Google AI Studio](https://aistudio.google.com/))

### Installation

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
   STEAM_API_KEY=your_steam_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Deploy Slash Commands**:
   ```bash
   node --env-file=.env ./Commands/Deployment/deploy-cmds.js
   ```

5. **Start the Bot**:
   ```bash
   node --env-file=.env index.js
   ```

## 🏗️ Project Structure

- `index.js`: Main entry point for the bot.
- `Commands/`: Contains command definitions and deployment scripts.
  - `Definitions/`: Individual slash command logic.
  - `Deployment/`: Script to register commands with Discord.
- `Events/`: Event handlers for bot status and interactions.
- `config.json`: Basic project metadata.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
