import { Request, Response, NextFunction } from "express"
import { auth } from "../services/firebase";

const getAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};


export default function (
    req: Request,
    res: Response,
    next: NextFunction) {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req
            if (!authToken) return res.status(403).send({ error: 'You are not authorized to make this request' })
            const userInfo = await auth.getAuth().verifyIdToken(authToken)
            req.authId = userInfo.uid
            return next()
        } catch (error) {
            // console.log({ error })
            return res.status(501).send({ error })
        }
    })
}