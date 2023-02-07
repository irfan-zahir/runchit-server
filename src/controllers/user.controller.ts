import { Request, Response } from "express";
import prisma from "../services/prisma"

export const userController = {

    // use in first time entering mobile apps
    // get current user from phone number / authId(uid)
    async index(req: Request, res: Response) {
        const { userPhone, authId, authToken } = req

        const currentUser = await prisma.user.findUnique({
            where: { uid: authId },
            include: { eligibilities: true, store: true }
        })

        if (currentUser === null) return res.status(307).json({ message: "new-user" })
        return res.status(200).json({ currentUser })
    },

    async createUser(req: Request, res: Response) {
        const { userPhone, authId, authToken } = req

        // const newUser = await prisma.user.create({
        //     data: {
        //         uid: authId,
        //         phone: userPhone,
        //     }
        // })
    }

}