import { Product } from '@prisma/client';
import { IProductQueryFields } from './product.dto';
export declare class ProductService {
    create_product({ storeId, ...product }: Omit<Product, "id">): Promise<Product>;
    query_product({ sku, categories }: IProductQueryFields): Promise<Product[]>;
    fetch_products(storeId: string): Promise<Product[]>;
    fetch_unique(id: string): Promise<Product>;
    update_product(product: Product): Promise<Product>;
    delete_product(id: string): Promise<Product>;
}
