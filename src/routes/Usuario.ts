import * as express from 'express';

module.exports = (app: express.Application) => {
    console.log("WORK");
    app.get("/usuarios", (req, res) => {
        res.send("Vc fez uma requisição para usuarios");
    });

}