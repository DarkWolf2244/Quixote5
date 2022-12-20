import { ButtonInteraction, Client, Collection, Events, GatewayIntentBits, Interaction } from "discord.js";
import * as fs from 'fs';
import { AcceptedQOTDSuggestionEmbed, ErrorEmbed, RejectedQOTDSuggestionEmbed, SuccessEmbed } from "./Embeds";
import { QXCommand } from "./interfaces";
import { ConfigManager } from "./ConfigManager";
import { QOTDManager } from "./QOTDManager";

export class Quixote {
    public client: Client;
    public commands: Collection<string, QXCommand> = new Collection();

    constructor() {
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds]
        });

        const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.ts')); // .js is used because this environment involves compiling from TS to JS
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            let cmd = new command.Command();
            this.commands.set(cmd.name, cmd)

            console.log(`COMMANDS: Command ${cmd.name} loaded.`);
        }

        console.log(this.commands);

        this.client.on('ready', this.onBotReady.bind(this));
        this.client.on('interactionCreate', this.onInteraction.bind(this)); // "this" will end up referring to this.client later on, so we bind

        ConfigManager.reloadData();
        QOTDManager.reloadQOTDs();
    }

    login(bot_token: string) {
        console.log("QUIXOTE: Logging in...");
        this.client.login(bot_token);
        console.log("At login: ");
        console.log(this.commands);
    }

    onBotReady() {
        console.log("QUIXOTE: The bot instance is ready.");
    }

    onInteraction(interaction: Interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.isButton()) this.onButtonInteraction(interaction);
        if (!interaction.isChatInputCommand()) return;

        console.log(this.commands);
        let command = this.commands.get(interaction.commandName);

        if (command) {
            command.execute(interaction, this);
            console.log(`User ${interaction.user.username} executed ${command.name}`);

        } else {
            console.log(`Command ${interaction.commandName} not found.`);
            let errorEmbed = ErrorEmbed('Command not found', `Sorry, '${interaction.commandName} wasn't found.`);
            interaction.reply({ embeds: [errorEmbed] });
        }
    }

    onButtonInteraction(interaction: ButtonInteraction) {
        console.log("Button interaction");
        let messageId = interaction.message.id;

        // Find the QOTD with a matching messageId
        let qotd = QOTDManager.getQOTD(messageId);

        let buttonPressed = interaction.customId;

        let embed = null;
        let msg = interaction.message;
        let oldEmbed = msg.embeds[0];

        if (buttonPressed == 'qotd-accept') {
            QOTDManager.moveQOTDToApproved(qotd.content);
            
            embed = SuccessEmbed("QOTD Accepted <a:check:820000000000000000>", `You accepted the QOTD.`);

            let newEmbed = AcceptedQOTDSuggestionEmbed(oldEmbed);
            msg.edit({ embeds: [newEmbed] });
        }
        else if (buttonPressed == 'qotd-reject') {
            QOTDManager.deleteQOTD(qotd.content);

            let newEmbed = RejectedQOTDSuggestionEmbed(oldEmbed);
            msg.edit({ embeds: [newEmbed] });
        } else {
            console.log(`Custom ID is ${buttonPressed}`);
        }
    }
}