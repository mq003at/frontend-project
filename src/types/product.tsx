import { Product } from "./common";

export interface UpdatedProduct {
    id: number,
    update: Partial<Product>
}


