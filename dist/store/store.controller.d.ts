import { StoreService } from './store.service';
import { Request } from 'express';
export declare class StoreController {
    private storeService;
    constructor(storeService: StoreService);
    require_stores(req: Request): Promise<{
        stores: (import(".prisma/client").Store & {
            roles: import(".prisma/client").StoreRole[];
        })[];
    }>;
}
