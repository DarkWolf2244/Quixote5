import { Quixote, QXCommand } from '../interfaces';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { QOTDManager } from '../QOTDManager';
import { SuccessEmbed } from '../Embeds';

export class Command implements QXCommand {
    name: string = "suggest";
    data: SlashCommandBuilder;

    constructor() {
        this.data = new SlashCommandBuilder()
            .addStringOption(option => option.setName('suggestion').setDescription('The QOTD').setRequired(true))
            .setName(this.name)
            .setDescription("Suggest a Question of the Day");
    }

    execute(interaction: ChatInputCommandInteraction<CacheType>, qx: Quixote) {
        const suggestion = interaction.options.getString('suggestion');
        let qotd = {
            content: suggestion,
            authorId: interaction.user.id
        }

        QOTDManager.addSuggestion(qotd, qx);
        interaction.reply({ embeds: [SuccessEmbed("Suggestion Added!", "Your suggestion has been sent to the staff.")] });
    }
}