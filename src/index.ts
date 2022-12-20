import { ConfigManager } from "./ConfigManager";
import { QOTDManager } from "./QOTDManager";
import { Quixote } from "./quixote";
require('dotenv').config();

const bot_token = process.env.bot_token;

ConfigManager.reloadData();

let quixote = new Quixote();

quixote.login(bot_token);