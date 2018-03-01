import * as fs from 'fs';
module.exports = () => {
    const VALIDATORS = {};
    fs.readdirSync("dist/middlewares").filter((file, key) => {
        if (file == "index.js") {
            return false;
        }
        return true;
    }).forEach((file, key) => {
        let { customValidators } = require(__dirname + "/" + file);
        Object.assign(VALIDATORS, customValidators);
    });
    return VALIDATORS;
}