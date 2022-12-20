import { Embed, EmbedBuilder } from 'discord.js';
import { QOTD } from './interfaces';

let randomFooters = [
    `Hi, D4N13L.`,
    `My name is Quixote. I'm the QOTD bot sent by DarkWolf.`,
    `My predecessor was unfortunately destroyed. This incident will not affect the investigation.`,
    `There's a small chance of seeing this footer.`,
    `I hate CAPTCHA.`,
    `Did you know some of these footers were AI generated?`,
    `I think you're pretty cool.`,
    `The name's Quixote. Don Quixote.`
]

let randomErrorFooters = [
    `It's not me, it's you.`,
    `I'm sorry an error occured. Please ~~don't~~ report this to the bot owner.`,
]

export function SuccessEmbed(title: string, message: string): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor('#00ff00')
        .setFooter({ text: randomFooters[Math.floor(Math.random() * randomFooters.length)] });  
}

export function ErrorEmbed(title: string, message: string): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor('#ff0000')
        .setFooter({ text: randomErrorFooters[Math.floor(Math.random() * randomErrorFooters.length)] });  
}

export function PendingEmbed(title: string, message: string): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor('#ffff00')
        .setFooter({ text: randomFooters[Math.floor(Math.random() * randomFooters.length)] });  
}

export function QOTDEmbed(qotd: QOTD): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle("Question of the Day")
        .setDescription(qotd.content)
        .setColor("Aqua")
        .setFooter({ text: `Suggested by <@${qotd.authorId}>`})
}

export function QOTDSuggestionEmbed(qotd: QOTD): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle("QOTD Suggestion")
        .setDescription("Please accept or reject this suggestion.")
        .addFields([
            { name: "QOTD", value: qotd.content },
            { name: "Author", value: `<@${qotd.authorId}>` }
        ])
        .setColor("#ffff00");
}

export function AcceptedQOTDSuggestionEmbed(oldEmbed: Embed): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle(" QOTD Suggestion [Approved]")
        .setDescription(`QOTD accepted by <@${oldEmbed.footer?.text.split('<@')[1].split('>')[0]}>`) // I am SO SORRY
        .addFields([
            { name: "QOTD", value: oldEmbed.fields[0].value },
            { name: "Author", value: oldEmbed.fields[1].value }
        ])
        .setColor("#00ff00")
}

export function RejectedQOTDSuggestionEmbed(oldEmbed: Embed): EmbedBuilder {
    return new EmbedBuilder()
        .setTitle(" QOTD Suggestion [Rejected]")
        .setDescription(`QOTD rejected by <@${oldEmbed.footer?.text.split('<@')[1].split('>')[0]}>`) // I am SO SORRY
        .addFields([
            { name: "QOTD", value: oldEmbed.fields[0].value },
            { name: "Author", value: oldEmbed.fields[1].value }
        ])
        .setColor("#ff0000")
}