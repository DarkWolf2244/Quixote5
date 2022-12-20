"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const builders_1 = require("@discordjs/builders");
const axios_1 = require("axios");
const Embeds_1 = require("../Embeds");
class Command {
    constructor() {
        this.name = 'ping';
        this.data = new builders_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Reply with a zen quote');
    }
    execute(interaction, quixote) {
        axios_1.default.get('https://zenquotes.io/api/random')
            .then(res => {
            let embed = Embeds_1.SuccessEmbed('Zen Quote', `"${res.data[0].q}" --${res.data[0].a}`);
            interaction.reply({ embeds: [embed] });
        })
            .catch(err => {
            console.error(err);
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=ping.js.map