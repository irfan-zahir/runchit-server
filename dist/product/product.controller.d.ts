import { ProductService } from './product.service';
import { Request } from 'express';
import { Product } from '@prisma/client';
import { IProductQueryFields } from './product.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    fetchAll(req: Request, query: IProductQueryFields): Promise<Product[]>;
    create({ currentStore: storeId }: Request, product: Omit<Product, "id">): Promise<Product>;
    single(productId: string): Promise<Product>;
    update(productId: string, product: Product): Promise<Product>;
    delete(productId: string): Promise<Product>;
}
