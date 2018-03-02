import { SECRET_KEY } from '../utils/SECRET_KEY';
import { LOAD_MODEL } from './../model/index';
import * as crypto from 'crypto';
import * as jwt from "jsonwebtoken";
const { user } = LOAD_MODEL();


export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        user.findOne({
            where: {
                username: username
            }
        }).then(user => {
            console.log(user);
            if (user) {
                if (crypto.createHmac("md5", SECRET_KEY).update(password).digest("hex") == user.password) {
                    var token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 60 * 120 });
                    console.log(token);
                    resolve(token);
                } else {
                    reject({ code: 401, msg: "Senha incorreta" });
                }
            } else {
                reject({ code: 204, msg: "Usuario não encontrado" })
            }
        });
    });
}

export const authJWT = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        res.send({ msg: "token não encontrado" })
    } else {
        var token = req.headers.authorization.split("Bearer").pop().trim();;
        jwt.verify(token, SECRET_KEY, (err, data) => {
            if (err) {
                res.status(401).json({ msg: "Token Inválido" });
            } else {
                req["session"] = data;
                next();
            }
        })
    }
}