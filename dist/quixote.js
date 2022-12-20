"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quixote = void 0;
const discord_js_1 = require("discord.js");
const fs = require("fs");
const Embeds_1 = require("./Embeds");
class Quixote {
    constructor(bot_token) {
        this.bot_token = bot_token;
        this.client = new discord_js_1.Client({
            intents: [discord_js_1.GatewayIntentBits.Guilds]
        });
        this.client.on('ready', this.onBotReady);
        this.client.on('interactionCreate', this.onInteraction);
        this.commands = new discord_js_1.Collection();
        const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js')); // .js is used because this environment involves compiling from TS to JS
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            let cmd = new command.Command();
            this.commands.set(cmd.name, cmd);
            console.log(`COMMANDS: Command ${cmd.name} loaded.`);
        }
        console.log(this.commands);
    }
    login() {
        console.log("QUIXOTE: Logging in...");
        this.client.login(this.bot_token);
    }
    onBotReady() {
        console.log("QUIXOTE: The bot instance is ready.");
    }
    onInteraction(interaction) {
        if (!interaction.isCommand())
            return;
        console.log(this.commands);
        let command = this.commands.get(interaction.commandName);
        if (command) {
            console.log(`User ${interaction.user.username} executed ${command.name}`);
        }
        else {
            console.log(`Command ${interaction.commandName} not found.`);
            let errorEmbed = Embeds_1.ErrorEmbed('Command not found', `Sorry, '${interaction.commandName} wasn't found.`);
            interaction.reply({ embeds: [errorEmbed] });
        }
    }
}
exports.Quixote = Quixote;
//# sourceMappingURL=quixote.js.map