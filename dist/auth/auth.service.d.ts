import { RegisterBodyDto } from './auth.dto';
export declare class AuthService {
    identify(authId: string): Promise<{
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
    register(authId: string, { stores, fullName }: RegisterBodyDto): Promise<{
        createdUser: import(".prisma/client").User;
    }>;
}
