import { CreateStoreDto } from './store.dto';
export declare class StoreService {
    create(store: CreateStoreDto): Promise<import(".prisma/client").Store>;
    fetch_all(authId: string): Promise<{
        stores: (import(".prisma/client").Store & {
            roles: import(".prisma/client").StoreRole[];
        })[];
    }>;
}
