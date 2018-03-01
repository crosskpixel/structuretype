import { LOAD_MODEL } from './../model/index';
import * as crypto from 'crypto';
import * as jwt from "jsonwebtoken";
const { db } = LOAD_MODEL();
const SECRET_KEY = "234567890iuytrew7uyjhn3edxc0e9orfigbhgnvmc0kkkk29384756f12";

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        db.user.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (user) {
                if (crypto.createHmac("md5", SECRET_KEY).update(password).digest("hex") == user.password) {
                    var token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 60 * 120 });
                    resolve(token);
                } else {
                    reject("Senha incorreta");
                }
            } else {
                console.log("user incorreto");
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
                res.status(401).json({ error: 401, msg: "invalid token" });
            } else {
                req.id = data.id;
                next();
            }
        })
    }
}