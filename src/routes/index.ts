import { default as express, Express, NextFunction, Request, Response } from "express";
import verifyAuthentication from "../middleware/verifyAuthentication";
import getCurrentStoreInHeader from "../middleware/getCurrentStore";

import userRoutes from "./user.routes"
import storeRoutes from "./store.routes"

export default function (app: Express) {
    const apiRouter = express.Router()

    apiRouter.get("/", (req, res) => {
        res.status(200).send("Welcome to RunchitAPI!")
    })

    app.use("/api/v1", verifyAuthentication, getCurrentStoreInHeader, apiRouter)

    apiRouter.use("/user", userRoutes)
    apiRouter.use("/store", storeRoutes)
}

