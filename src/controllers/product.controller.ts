import { Request, Response } from "express";
import prisma from "../services/prisma"
import { Product } from "@prisma/client"

type IProductAttribute = {name: string; value: string}
interface ICreateProductBody {
    name: string;
    sku: string;
    price: string;
    attributes: IProductAttribute[];
    quantity: number;
    supplier: string;
}

interface ICreateProductRequest extends Request{
    body: {product: ICreateProductBody}
}

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
            console.error(`Unexpected error occured while fetching products with this sku. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while fetching products with this sku. ${error}` })
        }
    },
    async findProductUnique(req: Request, res: Response){
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
    async createProduct(req: ICreateProductRequest, res: Response){
        try {
            const { currentStore } = req
            const {product: {quantity, attributes, supplier, sku, name, price}} = req.body
            const createdProduct = await prisma.product.create({
                data: {
                    name, price: +price, store: {connect: {id: currentStore}}
                }
            }).then(createdProduct=>
                prisma.productInventory.create({
                    data: {
                        storage: quantity, product: {connect: {id: createdProduct.id}}
                    }
                }).then(createdInventory =>
                    prisma.productSku.create({
                        data: {sku, product:{connect: {id: createdProduct.id}}}
                    }).then(async createdSku=>{
                        if(attributes.length > 0){
                            await Promise.all(
                                attributes.map(({name, value})=> prisma.productAttribute.create({
                                    data: {
                                        name, value, sku: {connect: {id: createdSku.id}}
                                    }
                                }))
                            )
                        }

                        if(supplier && supplier !== ""){
                            await prisma.supplier.create({
                                data: {name, contact: "", products: {connect: {id: createdProduct.id}}}
                            })
                        }
                    }).then(_=>prisma.product.findUnique({where: {id: createdProduct.id}}))
                )
            )
            res.status(200).json({product: createdProduct})
        } catch (error) {
            console.error(`Unexpected error occured while creating this product. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while creating this product. ${error}` })
            
        }
    }
} 