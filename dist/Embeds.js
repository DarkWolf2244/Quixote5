"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingEmbed = exports.ErrorEmbed = exports.SuccessEmbed = void 0;
const discord_js_1 = require("discord.js");
let randomFooters = [
    `Hi, D4N13L.`,
    `My name is Quixote. I'm the QOTD bot sent by DarkWolf.`,
    `My predecessor was unfortunately destroyed. This incident will not affect the investigation.`,
    `There's a small chance of seeing this footer.`,
    `I hate CAPTCHA.`,
    `Did you know some of these footers were AI generated?`,
    `I think you're pretty cool.`,
    `The name's Quixote. Don Quixote.`
];
let randomErrorFooters = [
    `It's not me, it's you.`,
    `I'm sorry an error occured. Please ~~don't~~ report this to the bot owner.`,
];
function SuccessEmbed(title, message) {
    return new discord_js_1.EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor('#00ff00')
        .setFooter({ text: randomFooters[Math.floor(Math.random() * randomFooters.length)] });
}
exports.SuccessEmbed = SuccessEmbed;
function ErrorEmbed(title, message) {
    return new discord_js_1.EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor('#ff0000')
        .setFooter({ text: randomErrorFooters[Math.floor(Math.random() * randomErrorFooters.length)] });
}
exports.ErrorEmbed = ErrorEmbed;
function PendingEmbed(title, message) {
    return new discord_js_1.EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor('#ffff00')
        .setFooter({ text: randomFooters[Math.floor(Math.random() * randomFooters.length)] });
}
exports.PendingEmbed = PendingEmbed;
//# sourceMappingURL=Embeds.js.map