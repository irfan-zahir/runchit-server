import { Request, Response } from "express";
import prisma from "../services/prisma"

interface ICreateProductBody {
    name: string;
    sku: string;
    purchase: string;
    sellPrice: string;
    quantity: number;
    unit: string;
}

interface ICreateProductRequest extends Request {
    body: { product: ICreateProductBody }
}

export const productController = {
    async index(req: Request, res: Response) {
        try {
            const { currentStore } = req
            const products = await prisma.product.findMany({
                where: { storeId: { equals: currentStore } }
            })

            res.status(200).json(products)
        } catch (error) {
            console.error(`Unexpected error occured while fetching products. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while fetching products. ${error}` })
        }
    },
    async findProductBySku(req: Request, res: Response) {
        try {
            const productSku = req.params.sku
            const products = await prisma.product.findMany({
                where: { sku: { equals: productSku } }
            })

            res.status(200).json({ products })
        } catch (error) {
            console.error(`Unexpected error occured while fetching products with this sku. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while fetching products with this sku. ${error}` })
        }
    },
    async findProductUnique(req: Request, res: Response) {
        try {
            const productId = req.params.id

            const product = prisma.product.findUnique({
                where: { id: productId }
            })

            res.status(200).json({ product })
        } catch (error) {
            console.error(`Unexpected error occured while fetching this product. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while fetching this product. ${error}` })
        }
    },
    async createProduct(req: ICreateProductRequest, res: Response) {
        try {
            const { currentStore } = req
            const { product: { sku, name, purchase, sellPrice, quantity, unit } } = req.body
            const product = await prisma.product.create({
                data: {
                    name, purchase: +purchase, sellPrice: +sellPrice, sku, storageQuantity: quantity, quantityUnit: unit,
                    store: { connect: { id: currentStore } },
                }
            })
            res.status(200).json({ product })
        } catch (error) {
            console.error(`Unexpected error occured while creating this product. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while creating this product. ${error}` })

        }
    }
} 