import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(require("./firebase_key.json")),
    databaseURL: "https://construirfacil-72bac.firebaseio.com"
});

console.log("TRUE");