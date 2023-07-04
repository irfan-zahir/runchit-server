export declare class UserService {
    constructor();
    findSingle(authId: string): Promise<import(".prisma/client").User | {
        message: string;
    }>;
    createUser(): Promise<void>;
}
