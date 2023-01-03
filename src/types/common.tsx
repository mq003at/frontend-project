export interface Common {
    id: number,
    image: string | string[],
    creationAt: string,
    updatedAt: string
}

export interface Category extends Common {
    name: string,
}

export interface Product extends Common {
    title: string,
    price: number,
    description: string
    category: Category
}

