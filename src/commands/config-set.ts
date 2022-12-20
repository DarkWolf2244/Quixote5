import { Quixote, QXCommand } from '../interfaces';
import { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ConfigManager } from '../ConfigManager';
import { ErrorEmbed, SuccessEmbed } from '../Embeds';

export class Command implements QXCommand {
    name: string = 'config-set';
    
    data: SlashCommandBuilder;

    constructor() {
        this.data = new SlashCommandBuilder()
                    .addStringOption(option => 
                        option
                            .setName('property')
                            .setDescription("What you'd like to configure")
                            .setRequired(true)
                            .addChoices(
                                { name: 'QOTD Channel ID', value: 'qotdChannelId'},
                                { name: 'QOTD Queue Channel ID', value: 'qotdQueueChannelId'},
                                { name: 'Controller Role ID (use /setController instead)', value: 'controllerRoleId'}
                            )
                    )
                    .setName('config-set')
                    .setDescription("Set a config channel to the current channel");
    }

    execute(interaction: ChatInputCommandInteraction, qx: Quixote) {
        const configProperty = interaction.options.getString('property');

        let data = ConfigManager.getData();
        
        console.log(`Attempting to set config property '${configProperty}'`);
        if (configProperty in data) {
            data[configProperty] = interaction.channelId;

            ConfigManager.setData(data);
            let successEmbed = SuccessEmbed("Successfully set! <a:check:986637218930106448>", "The property was set.");

            interaction.reply({ embeds: [successEmbed]});

            
        }
        
         else {
            let errorEmbed = ErrorEmbed('Not a valid config property', "Please supply a real config property, like `qotdChannelId` or `controllerRoleId`.");
            interaction.reply({ embeds: [errorEmbed]});
        }
    }
}