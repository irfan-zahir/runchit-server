declare namespace Express {
    export interface Request {
        authToken?: string | null;
        authId?: string | null;
    }
}