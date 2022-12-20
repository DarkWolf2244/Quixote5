import * as fs from 'fs';
import { QOTD, QOTDFile } from './interfaces';
import { Quixote } from './quixote';
import { QOTDEmbed, QOTDSuggestionEmbed } from './Embeds';
import { ButtonStyle, TextChannel } from 'discord.js';
import { ConfigManager } from './ConfigManager';
import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';

let qotdFile = require("./data/qotd.json");

export class QOTDManager {
    static qotds: QOTDFile

    static reloadQOTDs() {
        this.qotds = require("./data/qotd.json");
    }

    static writeQOTDs() {
        fs.writeFileSync(__dirname + "/data/qotd.json", JSON.stringify(this.qotds, null, 4));
    }

    static getRandomApprovedQOTD() {
        // An approved QOTD is one that is in qotds.approved

        let qotds = this.qotds.approved;
        let index = Math.floor(Math.random() * qotds.length);

        return qotds[index];
    }

    static moveQOTDToApproved(qotdContent: string) {
        // Move the QOTD from qotds.approvalQueue to qotds.approved
        let qotd = this.qotds.approvalQueue.find(qotd => qotd.content === qotdContent);
        if (!qotd) throw `The QOTD to move (${qotdContent}) doesn't exist in qotds.approvalQueue`;

        if (qotd) {
            this.qotds.approved.push(qotd);
            this.qotds.approvalQueue = this.qotds.approvalQueue.filter(qotd => qotd.content !== qotdContent);
        
            this.writeQOTDs();
        }
    }

    static getQOTD(messageId: string) {
        return this.qotds.approved.find(qotd => qotd.suggestionMessageId === messageId);
    }
    
    static deleteQOTD(qotdContent: string) {
        // Delete the QOTD from qotds.approved
        let qotd = this.qotds.approved.find(qotd => qotd.content === qotdContent);
        if (!qotd) throw `The QOTD to delete (${qotdContent}) doesn't exist in qotds.approved`;

        if (qotd) {
            this.qotds.approved = this.qotds.approved.filter(qotd => qotd.content !== qotdContent);

            this.writeQOTDs();
        }
    }
    
    static sendQOTD(channelId: string, qotd: QOTD, qx: Quixote) {
        // Get the channel from the ID
        let channel = qx.client.channels.cache.get(channelId) as TextChannel;
        let embed = QOTDEmbed(qotd);

        channel.send({ embeds: [embed] });
    }
    
    static addSuggestion(qotd: QOTD, qx: Quixote) {
        // Add the suggestion to the qotds.suggestions
        this.qotds.approvalQueue.push(qotd);

        this.writeQOTDs();
        this.sendSuggestionToMods(qotd, qx);
    }

    static sendSuggestionToMods(qotd: QOTD, qx: Quixote) {
        // Send an embed to the qotdQueueChannelId, adding two buttons - Reject and Approve
        let channelPromise = qx.client.channels.fetch(ConfigManager.getData().qotdQueueChannelId) as Promise<TextChannel>;

        let componentRow = new ActionRowBuilder<ButtonBuilder>();
        componentRow.addComponents(
            new ButtonBuilder()
                .setCustomId("qotd-reject")
                .setLabel("Reject")
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId("qotd-approve")
                .setLabel("Approve")
                .setStyle(ButtonStyle.Success)
        );

        channelPromise.then(channel => {
            let embed = QOTDSuggestionEmbed(qotd);
            let message = channel.send({ embeds: [embed], components: [componentRow] });

            message.then(msg => {
                // Set suggestionMessageId to msg.id
                qotd.suggestionMessageId = msg.id;
                this.writeQOTDs();
            })
        });
    }
}
