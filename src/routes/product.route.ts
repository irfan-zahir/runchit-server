import { productController } from "../controllers/product.controller";
import { Router } from "express";

const routes = Router()

routes.get("/", productController.index)
routes.post("/create", productController.createProduct)
routes.get("/:sku", productController.findProductBySku)
routes.get("/:id", productController.findProductUnique)

export default routes