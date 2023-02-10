import { Request, Response } from "express";
import prisma from "../services/prisma"
import { Runchit, User } from "@prisma/client"

interface ICreateUserBody {
    stores: Array<Runchit>
}

interface ICreateUserRequest extends Request {
    body: ICreateUserBody
}

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
    },
    async create(req: ICreateUserRequest, res: Response) {
        try {
            const { authId: uid } = req
            const { stores } = req.body
            const allStores = await Promise.all(
                stores.map(async store => {
                    const createdStore = await prisma.runchit.create({
                        data: store,
                    })

                    const role = await prisma.storeRole.create({
                        data: {
                            name: "Owner",
                            store: { connect: { id: createdStore.id } }
                        }
                    })

                    const member = await prisma.storeMember.create({
                        data: {
                            store: { connect: { id: createdStore.id } },
                            members: { connect: { uid } }
                        }
                    })

                    const updatedStore = await prisma.runchit.update({
                        where: { id: createdStore.id },
                        data: {
                            roles: { connect: { id: role.id } },
                            members: { connect: { id: member.id } }
                        },
                    })

                    return updatedStore
                })
            ).then(async createdShops => await prisma.runchit.findMany({
                where: { members: { every: { memberId: uid } } }
            }))

            res.status(200).json({ stores: allStores })
        } catch (error) {
            console.error(`Unexpected error occured while fetching stores. ${error}`)
            res.status(500).json({ error: `Unexpected error occured while fetching stores. ${error}` })
        }
    }
}