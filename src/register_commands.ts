require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
import { ConfigManager } from './ConfigManager';
require('dotenv').config()

ConfigManager.reloadData();
const { clientId, guildId } = ConfigManager.getData();

import * as fs from 'fs';
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
