import { storeController } from "../controllers/store.controller";
import { Router } from "express";
import { userController } from "../controllers/user.controller"

const routes = Router()

routes.get("/", storeController.index)

export default routes