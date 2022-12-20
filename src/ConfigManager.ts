import * as fs from 'fs'
import { Config } from './interfaces'

export class ConfigManager {
    static data: Config;

    static reloadData() {
        // require.cache[require.resolve('./data/config.json')] = null;
        this.data = require('./data/config.json');
    }

    static writeData() {
        fs.writeFileSync(__dirname + '/data/config.json', JSON.stringify(this.data, null, 4));
    }

    static getData(): Config {
        return this.data;
    }

    static setData(data: Config) {
        this.data = data;
        this.writeData();
    }
}