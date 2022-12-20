"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quixote_1 = require("./quixote");
require('dotenv').config();
const bot_token = process.env.bot_token;
let quixote = new quixote_1.Quixote(bot_token);
quixote.login();
//# sourceMappingURL=index.js.map