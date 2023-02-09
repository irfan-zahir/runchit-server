import { Request, Response } from "express";
import prisma from "../services/prisma"
import { Runchit, User } from "@prisma/client"

export const storeController = {
    async index(req: Request, res: Response) {
        try {
            const { authId } = req
            const stores = await prisma.runchit.findMany({
                where: { members: { every: { memberId: { equals: authId } } } },
                select: { id: true, name: true, duitnowqr: true }
            })
            res.status(200).json(stores)
        } catch (error) {
            console.error(`Unexpected error occured while fetching stores. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while fetching stores. ${error}` })
        }
    }
}