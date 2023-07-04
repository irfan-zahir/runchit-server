import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterBodyDto } from './auth.dto';
export declare class AuthController {
    private userService;
    constructor(userService: AuthService);
    require_user(req: Request): Promise<{
        message: string;
        currentUser?: undefined;
    } | {
        currentUser: import(".prisma/client").User & {
            storeMember: (import(".prisma/client").StoreMember & {
                roles: import(".prisma/client").StoreRole[];
            })[];
        };
        message?: undefined;
    }>;
    registration(registerBody: RegisterBodyDto, req: Request): Promise<{
        createdUser: import(".prisma/client").User;
    }>;
}
