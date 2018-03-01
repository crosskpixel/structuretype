import * as express from 'express';
let { validateSchema } = require("../middlewares/Usuario.middleware");

const CHECK_REQUEST = {
    nome: {
        in: "query",
        isLength: {
            options: [{ min: 1, max: 50 }]
        },
        errorMessage: "Informe um nome válido",
    },
    cpf: {
        in: "query",
        isCpf: true,
        errorMessage: "Informe um CPF válido"
    }
}

module.exports = (app: express.Application) => {
    app.get("/usuarios", validateSchema(CHECK_REQUEST), (req, res) => {
        res.send("Vc fez uma requisição para usuarios");
    });

}