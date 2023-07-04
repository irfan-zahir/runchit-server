import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class AuthenticationMiddleware implements NestMiddleware {
    getAuthToken(req: Request, res: Response, next: NextFunction): void;
    use(req: any, res: any, next: (error?: any) => void): Promise<void>;
}
