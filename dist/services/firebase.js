"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const admin = require("firebase-admin/app");
const auth = require("firebase-admin/auth");
exports.auth = auth;
const credential = require("./service-account.json");
admin.initializeApp({
    credential: admin.cert({
        projectId: credential.project_id,
        clientEmail: credential.client_email,
        privateKey: credential.private_key
    })
});
//# sourceMappingURL=firebase.js.map