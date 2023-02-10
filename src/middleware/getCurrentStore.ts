import { Request, Response, NextFunction } from "express"

export default function (
    req: Request,
    res: Response,
    next: NextFunction) {
    try {
        const currentStore = req.headers["current-store"] as string
        req.currentStore = currentStore === "" ? undefined : currentStore
        next()
    } catch (error) {
        console.error("Unexpected error while catching current store: ", error)
    }
} 