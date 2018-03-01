import { customValidators } from './middlewares/Usuario.middleware';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as consign from 'consign';
import * as fs from 'fs';
import * as expressValidator from 'express-validator';
// Criando as configurações para o ExpressJS
class App {
    // Instancia dele
    public express: express.Application;
    constructor() {
        this.express = express();
        this.config();
        this.middleware();
        this.routes();
    }

    private config(): void {
        this.express.use(express.static(path.join(__dirname, "public")));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cors({ origin: "*", allowedHeaders: ["Content-Type", "Authorization"] }));
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            req["session"] = {};
            req["ROOT_PATH"] = __dirname;
            res.setHeader("Cache-Control", 'no-cache');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.setHeader("Access-Control-Allow-Headers", "*");
            res.setHeader('Access-Control-Allow-Credentials', "false");
            res.setHeader('Access-Control-Max-Age', '1728000');
            next();
        });
    }

    private middleware(): void {
        let customValidators = require("./middlewares/index")();
        this.express.use(expressValidator({customValidators}));
    }

    private routes(): void {
        this.express.get("/", (req, res) => res.send("true"));
        fs.readdirSync("dist/routes").forEach((file, key) => {
            require("./routes/" + file)(this.express);
        });
        //consign().include("dist/routes").into(this.express);
    }
}
export default new App().express;