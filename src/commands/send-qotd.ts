import { Quixote, QXCommand } from '../interfaces';
import { CacheType, ChatInputCommandInteraction, TextChannel } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ErrorEmbed, QOTDEmbed, SuccessEmbed } from '../Embeds';
import { QOTDManager } from '../QOTDManager';
import { ConfigManager } from '../ConfigManager';

export class Command implements QXCommand {
    name: string = "send-qotd";
    data: SlashCommandBuilder;

    constructor() {
        this.data = new SlashCommandBuilder() 
            .addStringOption(option => 
                        option.setName('qotd')
                        .setDescription('The QOTD to send. Not specifying this will send a random approved QOTD.')
            )
            .setName(this.name)
            .setDescription("Force a QOTD to be sent - either specified here or from the approved queue");
    }

    execute(interaction: ChatInputCommandInteraction<CacheType>, qx: Quixote) {
        const customQOTD = interaction.options.getString('qotd');
        
        if (customQOTD) {
            let channelId = ConfigManager.getData().qotdChannelId;
            console.log(`Channel ID at execute is ${channelId}`)
            console.log(`Data at execute is: `);
            console.log(ConfigManager.getData());

            let channel = qx.client.channels.fetch(channelId) as Promise<TextChannel>;
            
            channel.then((channel: TextChannel) => {
                let qotd = {
                    content: customQOTD,
                    authorId: interaction.user.id
                }
    
                let embed = QOTDEmbed(qotd);
                
                channel.send({ embeds: [embed] });
    
                interaction.reply({ embeds: [SuccessEmbed("Successfully sent QOTD!", `Your custom QOTD was sent to <#${channelId}>`)] });
            });
        }
    }
}