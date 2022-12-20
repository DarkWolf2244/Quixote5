import { Quixote, QXCommand } from '../interfaces';
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { SuccessEmbed } from '../Embeds';

export class Command implements QXCommand {
    name: string = 'ping';
    data: SlashCommandBuilder
    
    constructor() {
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Reply with a zen quote')
    }

    execute(interaction: CommandInteraction, quixote: Quixote): any {
        axios.get('https://zenquotes.io/api/random')
            .then(res => {
                let embed = SuccessEmbed('Zen Quote', `"${res.data[0].q}" --${res.data[0].a}`);
                interaction.reply({ embeds: [embed] });
            })
            .catch(err => {
                console.error(err);
            });
    }
}