import { Request, Response } from "express";
import prisma from "../services/prisma"
import { Runchit, User } from "@prisma/client"

interface ICreateUserBody {
    fullName: string;
    shops: Array<Runchit>
}

interface ICreateUserRequest extends Request {
    body: ICreateUserBody
}

const baseSelection = {
    fullName: true, subscription: true, uid: true
}

export const userController = {
    // use in first time entering mobile apps
    // get current user from phone number / authId(uid)
    async index(req: Request, res: Response) {
        const { userPhone, authId, authToken, currentStore } = req

        const currentUser = await prisma.user.findUnique({
            where: { uid: authId },
            // include: { memberOf: true },
            select: { ...baseSelection, memberOf: { where: { storeId: currentStore ? { equals: currentStore } : { not: undefined } } } }
        })

        if (currentUser === null) return res.status(307).json({ message: "new-user" })
        return res.status(200).json({ currentUser })
    },

    // user registration
    async ownerRegistration(req: ICreateUserRequest, res: Response) {
        const { userPhone: phone, authId: uid, body: { fullName, shops } } = req

        try {

            const result = await prisma.user.create({
                data: { fullName, uid, phone },
            }).then(async createdUser => {
                const createdStores = await Promise.all(
                    shops.map(async store => {
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
                )

                return { user: createdUser, stores: createdStores }
            })

            res.status(200).json({ ...result })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error })
        }
    }

}