import * as express from 'express';
import { validateSchema } from "../utils/utils";
import * as ValidationSchemaParamOptions from 'express-validator/shared-typings';
import { LOAD_MODEL } from './../model/index';
const db = LOAD_MODEL();

const CHECK_REQUEST_REGISTER = {
    name: {
        in: "body",
        isLength: {
            options: [{ min: 1, max: 50 }]
        },
        errorMessage: "Informe um nome válido",
    },
    username: {
        in: "body",
        isLength: {
            options: [{ min: 1, max: 15 }]
        },
        errorMessage: "O nome de usuario deve ter entre 1 a 15 caracteres"
    },
    email: {
        in: "body",
        isEmail: true,
        errorMessage: "Informe um email Válido"
    },
    password: {
        in: "body",
        isLength: {
            options: [{ min: 1, max: 30 }]
        }
    }
};

interface Usuario {
    name: string,
    username: string,
    email: string,
    password: string
}

module.exports = (app: express.Application) => {

    app.post("/usuarios", validateSchema(CHECK_REQUEST_REGISTER), (req: express.Request, res: express.Response) => {
        let { name, username, email, password }: Usuario = req.body;
        let usuario: Usuario = { name, username, email, password };

        db.user.create(
            { ...usuario, email_auth: 1 }
        ).then(() => {
            res.end("Gravado");
        });
    });

    app.get("/teste", (req, res) => {
        db.user.findOne({
            where: {
                id: 1
            },
            attributes: { exclude: ["id", "createdAt", "updatedAt"] }
        }).then(user => {
            res.json(user);
        });
    });



}