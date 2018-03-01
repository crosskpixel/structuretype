import * as express from 'express';
import { Response } from 'express-serve-static-core';
import { validateSchema } from "../utils/utils";
import { LOAD_MODEL } from './../model/index';
const db = LOAD_MODEL();

const CHECK_REQUEST_REGISTER = {
    nome: {
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
    }
}

interface Usuario {
    id:number,
    nome:string,
    username:string,
    email:string
}

module.exports = (app: express.Application) => {
    app.post("/usuarios", validateSchema(CHECK_REQUEST_REGISTER), (req: express.Request, res: express.Response) => {
       //let {nome,username,email} = req.body;
        let usuario:Usuario = req.body;
        console.log(usuario);
        res.end();
    });

    app.get("/teste", (req, res) => {
        db.user.findOne({
            where: {
                id: 1
            },
            attributes: { exclude: ["id","createdAt","updatedAt"] }
        }).then(user => {
            res.json(user);
        });
    });



}