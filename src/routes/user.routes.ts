import { Router } from "express";
import { userController } from "../controllers/user.controller"

const routes = Router()

routes.get("/", userController.index)

routes.post("/registration", userController.ownerRegistration)

export default routes