import { Client, SlashCommandBuilder, ChatInputCommandInteraction, Collection, Interaction, ButtonInteraction } from "discord.js"


export interface Config {
    qotdChannelId: string,
    qotdQueueChannelId: string,
    controllerRoleId: string,
    clientId: string,
    guildId: string
}

export interface Quixote {
    client: Client,
    commands: Collection<string, QXCommand>,
    login: (bot_token: string) => void,
    onBotReady: () => void,
    onInteraction: (interaction: Interaction) => void,
    onButtonInteraction: (interaction: ButtonInteraction) => void
}

export interface QXCommand {
    name: string,
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction, qx: Quixote) => void;
}

export interface QOTD {
    content: string,
    authorId: string,
    suggestionMessageId?: string
}

export interface QOTDFile {
    approvalQueue: QOTD[],
    approved: QOTD[]
}