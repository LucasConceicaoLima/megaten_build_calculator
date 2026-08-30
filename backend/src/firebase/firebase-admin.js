"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
exports.firestore = admin.firestore();
