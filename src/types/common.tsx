export interface Common {
    id: number,
    creationAt: string,
    updatedAt: string
}

export interface Category extends Common {
    name: string,
    image: string
}

export interface Product extends Common {
    title: string,
    price: number,
    description: string
    images: string[]
    category: Category
}

export interface ResponseImage {
    originalname: string,
    filename: string,
    location: string
}

export interface UpdatedProduct {
    id: number,
    update: Partial<Product>
}

export interface AddProductWithImageParams {
    imageArray: File[],
    product: Product
}
