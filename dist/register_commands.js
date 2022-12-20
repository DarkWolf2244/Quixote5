"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
require('dotenv').config();
const clientId = config.client.clientId;
const guildId = config.client.guildId;
const fs = require("fs");
const token = process.env.bot_token;
const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.ts'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    let cmd = new command.Command();
    commands.push(cmd.data);
}
const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
//# sourceMappingURL=register_commands.js.map