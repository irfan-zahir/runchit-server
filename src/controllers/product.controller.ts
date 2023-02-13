import { Request, Response } from "express";
import prisma from "../services/prisma"
import { Runchit, User } from "@prisma/client"

export const productController = {
    async index(req: Request, res: Response) {
        try {
            const { currentStore } = req
            const products = await prisma.product.findMany({
                where: { storeId: { equals: currentStore } },
            })

            res.status(200).json({ products })
        } catch (error) {
            console.error(`Unexpected error occured while fetching products. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while fetching products. ${error}` })
        }
    },
    async findProductBySku(req: Request, res: Response) {
        try {
            const productSku = req.params.sku
            const products = await prisma.product.findMany({
                where: { sku: { some: { sku: { equals: productSku } } } }
            })

            res.status(200).json({ products })
        } catch (error) {
            console.error(`Unexpected error occured while fetching products by sku. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while fetching products by sku. ${error}` })
        }
    }
} 