import { default as express, Express, NextFunction, Request, Response } from "express";
import verifyAuthentication from "./middleware/verifyAuthentication";
const apiRouter = express.Router()

apiRouter.get("/", (req, res) => {
    const { authId, authToken } = req
    console.log({ authId, authToken })
    res.status(200).json({ authId, authToken })
})

export default function (app: Express) {
    app.use("/api/v1", verifyAuthentication, apiRouter)
}

