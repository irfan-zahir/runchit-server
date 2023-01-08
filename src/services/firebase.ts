import * as admin from "firebase-admin/app"
import * as auth from "firebase-admin/auth"
import credential from "./service-account.json"

admin.initializeApp({
    credential: admin.cert({
        projectId: credential.project_id,
        clientEmail: credential.client_email,
        privateKey: credential.private_key
    })
})
export { auth }